import json
import os.path
from datetime import timedelta

from service.common.impl.message_source import MessageSourceImpl
from service.common.impl.screen_navigator import ScreenNavigatorImpl
from service.common.mapper import Mapper
from service.common.utils import get_root_path, update_screen_by_alias
from service.core.auth.filter import AuthFilter
from service.core.device.endpoint import DeviceEndpoint
from service.core.device.impl.use_case import GetDeviceListUseCaseImpl, GetTrainingTypeListUseCaseImpl
from service.core.dictionary.endpoint import DictionaryEndpoint
from service.core.dictionary.impl import GetDictionaryUseCaseImpl
from service.core.dictionary.provider.get.get_dictionary_provider import DefaultDictionaryProvider
from service.core.dictionary.provider.get.get_dictionary_provider_registry import GetDictionaryProviderRegistry
from service.core.dictionary.provider.get.stateful_channel_dictionary_provider import StatefulChannelDictionaryProvider
from service.core.group.endpoint import GroupEndpoint
from service.core.group.impl.repo import GroupRepoImpl
from service.core.group.impl.use_case import GetGroupListUseCaseImpl, GetUserListByGroupUseCaseImpl
from service.core.screen import FileSystemScreenRepo
from service.core.screen import ScreenEndpoint
from service.core.screen.impl import SaveScreenUseCaseImpl, GetScreenUseCaseImpl
from service.core.screen.processor.get.channel_editor_get_screen_processor import ChannelEditorGetScreenProcessor
from service.core.screen.processor.get.channel_list_get_screen_processor import ChannelListGetScreenProcessor
from service.core.screen.processor.get.direction_editor_get_screen_processor import DirectionEditorGetScreenProcessor
from service.core.screen.processor.get.direction_list_get_screen_processor import DirectionListGetScreenProcessor
from service.core.screen.processor.get.get_screen_processor import DefaultGetScreenProcessor
from service.core.screen.processor.get.get_screen_processor_registry import GetScreenProcessorRegistry
from service.core.screen.processor.get.main_screen_get_screen_processor import MainScreenGetScreenProcessor
from service.core.screen.processor.get.select_active_direction_get_screen_processor import \
    SelectActiveDirectionGetScreenProcessor
from service.core.screen.processor.save import ChannelEditorSaveScreenProcessor
from service.core.screen.processor.save.direction_editor_save_screen_processor import DirectionEditorSaveScreenProcessor
from service.core.screen.processor.save.save_screen_processor_registry import SaveScreenProcessorRegistry
from service.core.screen.processor.save.select_active_direction_save_screen_processor import \
    SelectActiveDirectionSaveScreenProcessor
from service.core.session import SessionEndpoint
from service.core.session.impl.repo import InMemorySessionRepo
from service.core.session.impl.training import DumbTrainingResultCalculatorStrategy, \
    TrainingResultCalculatorServiceImpl, UTK2ResultCalculatorStrategy, CalculateMarkByTime, UTK3ResultCalculatorStrategy
from service.core.session.impl.use_case import GetSessionListUseCaseImpl, CreateSessionUseCaseImpl, \
    StartSessionUseCaseImpl, FinishSessionUseCaseImpl, ValidateTrainingSessionUseCaseImpl, \
    GetActiveDirectionBySessionIdUseCaseImpl
from service.core.session.training import Mark
from service.core.session.training_validator.step_validator_utk2 import UTK2Step1Validator, UTK2Step2Validator, \
    UTK2Step3Validator
from service.core.session.training_validator.step_validator_utk3 import UTK3Step1Validator, UTK3Step3Validator, \
    UTK3Step2Validator
from service.core.session.training_validator.training_validator import TrainingValidatorImpl, TrainingValidatorRegistry
from service.core.students_marks.endpoint import StudentsMarksEndpoint
from service.core.students_marks.impl.students_marks import GetStudentsMarksTableUseCaseImpl
from service.core.task.description.service import TaskDescriptionServiceImpl
from service.core.task.description.task_description_strategy_utk2 import TaskDescriptionStrategyUTK2
from service.core.task.description.task_description_strategy_utk3 import TaskDescriptionStrategyUTK3
from service.core.task.description.task_description_strategy_utk4 import TaskDescriptionStrategyUTK4
from service.core.task.endpoint import TaskEndpoint
from service.core.task.impl.use_case import IssueTaskListUseCaseImpl, GetTaskUseCaseImpl, GetTaskTemplateUseCaseImpl
from service.core.task.template.service import TaskTemplateServiceImpl
from service.core.user.endpoint import UserEndpoint
from service.core.user.impl.repo import InMemoryUserRepo, UserRepoDecorator
from service.core.user.impl.use_case import RegisterUserUseCaseImpl, AuthenticateUserUseCaseImpl, LoginUserUseCaseImpl
from service.db.db import JsonDb
from service.domain.training import TrainingType
from service.mapper.mapper import TrainingMapper, SessionAttemptMapper, ChannelMapper, DirectionMapper, PPRCHMapper, \
    PhoneMapper, SessionMapper, StudentMapper, TeacherMapper, GroupMapper
from service.mapper.mapper_dto import SessionDtoMapper

update_screen_by_alias()

save_screen_processor_registry = SaveScreenProcessorRegistry([ChannelEditorSaveScreenProcessor(),
                                                              DirectionEditorSaveScreenProcessor(),
                                                              SelectActiveDirectionSaveScreenProcessor()])

db_json_path = get_root_path().joinpath('service/db/db.json')
db = JsonDb(db_json_path)
mapper = Mapper()

get_screen_processor_registry = GetScreenProcessorRegistry([ChannelListGetScreenProcessor(),
                                                            ChannelEditorGetScreenProcessor(),
                                                            DirectionListGetScreenProcessor(),
                                                            DirectionEditorGetScreenProcessor(),
                                                            SelectActiveDirectionGetScreenProcessor(),
                                                            MainScreenGetScreenProcessor()],
                                                           DefaultGetScreenProcessor())

screens_dir_path = get_root_path().joinpath('mcs-ui/public/screen')  # TODO: migrate to storage (mongo, redis, pg)
screens_storage = FileSystemScreenRepo(screens_dir_path)

session_attempt_mapper = SessionAttemptMapper()
channel_mapper = ChannelMapper()
direction_mapper = DirectionMapper()
pprch_mapper = PPRCHMapper()
phone_mapper = PhoneMapper(channel_mapper, direction_mapper, pprch_mapper)
training_mapper = TrainingMapper()
session_mapper = SessionMapper(phone_mapper, session_attempt_mapper, training_mapper, )

session_repo = InMemorySessionRepo(db, session_mapper)

save_screen_use_case = SaveScreenUseCaseImpl(session_repo, save_screen_processor_registry)
get_screen_use_case = GetScreenUseCaseImpl(session_repo, get_screen_processor_registry, screens_storage)

screen_endpoint = ScreenEndpoint(
    save_screen_use_case,
    get_screen_use_case
)

student_mapper = StudentMapper()
student_repo = InMemoryUserRepo(db, student_mapper, 'users')
teacher_mapper = TeacherMapper()
teacher_repo = InMemoryUserRepo(db, teacher_mapper, 'teachers')
user_repo = UserRepoDecorator([student_repo, teacher_repo])

auth_filter = AuthFilter(user_repo)

register_user_use_case = RegisterUserUseCaseImpl(user_repo, mapper)
authenticate_user_use_case = AuthenticateUserUseCaseImpl(user_repo)
login_user_use_case = LoginUserUseCaseImpl(user_repo)

user_endpoint = UserEndpoint(
    register_user_use_case,
    authenticate_user_use_case,
    login_user_use_case
)

calculate_mark_by_time_120_150_180 = CalculateMarkByTime({timedelta(seconds=120): Mark.FIVE,
                                                          timedelta(seconds=150): Mark.FOUR,
                                                          timedelta(seconds=180): Mark.THREE, })
training_result_calculator = TrainingResultCalculatorServiceImpl(
    [UTK2ResultCalculatorStrategy(calculate_mark_by_time_120_150_180),
     UTK3ResultCalculatorStrategy(calculate_mark_by_time_120_150_180), ],
    DumbTrainingResultCalculatorStrategy())

screen_graph = {
    "MAIN_SCREEN": [
        "MAIN_MENU",
        "SELECT_ACTIVE_DIRECTION"
    ],
    "MAIN_MENU": [
        "SERVICE_MENU"
    ],
    "SERVICE_MENU": [
        "DATA_EDITOR",
    ],
    "DATA_EDITOR": [
        "CHANNEL_LIST",
        "DIRECTION_LIST",
        "PPRCH_FREQUENCY_PLAN"
    ],
    "CHANNEL_LIST": [
        "CHANNEL_EDITOR"
    ],
    "DIRECTION_LIST": [
        "DIRECTION_EDITOR"
    ]
}
message_by_code_path = get_root_path().joinpath('service/db/message_by_code.json')
message_by_code = json.loads(message_by_code_path.read_text('utf-8'))
screen_by_alias_path = get_root_path().joinpath('service/db/screen_by_alias.json')
screen_by_alias = json.loads(screen_by_alias_path.read_text('utf-8'))
navigator = ScreenNavigatorImpl(screen_graph, screen_by_alias)
message_source = MessageSourceImpl(message_by_code)
training_validator_utk_2 = TrainingValidatorImpl([UTK2Step1Validator(navigator, message_source),
                                                  UTK2Step2Validator(navigator, message_source),
                                                  UTK2Step3Validator(navigator, message_source)],
                                                 TrainingType.UTK2)
training_validator_utk_3 = TrainingValidatorImpl([UTK3Step1Validator(navigator, message_source),
                                                  UTK3Step2Validator(navigator, message_source),
                                                  UTK3Step3Validator(navigator, message_source), ],
                                                 TrainingType.UTK3)
training_validator_registry = TrainingValidatorRegistry([training_validator_utk_2,
                                                         training_validator_utk_3])

session_dto_mapper = SessionDtoMapper()
get_session_list_use_case = GetSessionListUseCaseImpl(session_repo, session_dto_mapper)
create_session_use_case = CreateSessionUseCaseImpl(session_repo, session_dto_mapper)

start_session_use_case = StartSessionUseCaseImpl(session_repo)
finish_session_use_case = FinishSessionUseCaseImpl(session_repo, training_result_calculator)
get_active_direction_by_session_id = GetActiveDirectionBySessionIdUseCaseImpl(session_repo)
validate_training_session_use_case = ValidateTrainingSessionUseCaseImpl(session_repo, training_validator_registry)

session_endpoint = SessionEndpoint(
    get_session_list_use_case,
    create_session_use_case,
    start_session_use_case,
    finish_session_use_case,
    validate_training_session_use_case,
    get_active_direction_by_session_id,
)

default_dictionary_provider = DefaultDictionaryProvider(os.path.join(get_root_path(), 'mcs-ui/public/dictionary'))
get_dictionary_provider_registry = GetDictionaryProviderRegistry([StatefulChannelDictionaryProvider()],
                                                                 default_dictionary_provider)

get_dictionary_use_case = GetDictionaryUseCaseImpl(session_repo,
                                                   get_dictionary_provider_registry)
dictionary_endpoint = DictionaryEndpoint(get_dictionary_use_case)

group_mapper = GroupMapper()
group_repo = GroupRepoImpl(db, group_mapper, student_mapper)

get_group_list_use_case = GetGroupListUseCaseImpl(group_repo)
get_user_list_by_group_use_case = GetUserListByGroupUseCaseImpl(group_repo)
group_endpoint = GroupEndpoint(
    get_group_list_use_case,
    get_user_list_by_group_use_case
)
students_marks_endpoint = StudentsMarksEndpoint(GetStudentsMarksTableUseCaseImpl(training_result_calculator,
                                                                                 session_repo,
                                                                                 group_repo, ))

get_device_list_use_case = GetDeviceListUseCaseImpl()
get_training_type_list_use_case = GetTrainingTypeListUseCaseImpl()

device_endpoint = DeviceEndpoint(
    get_device_list_use_case,
    get_training_type_list_use_case
)

issue_task_list_use_case = IssueTaskListUseCaseImpl(
    create_session_use_case,
    get_user_list_by_group_use_case
)

task_description_service = TaskDescriptionServiceImpl([TaskDescriptionStrategyUTK2(),
                                                       TaskDescriptionStrategyUTK3(),
                                                       TaskDescriptionStrategyUTK4(), ])

get_task_use_case = GetTaskUseCaseImpl(
    session_repo,
    task_description_service
)

task_template_service = TaskTemplateServiceImpl()

get_task_template_use_case = GetTaskTemplateUseCaseImpl(
    task_template_service
)

task_endpoint = TaskEndpoint(
    issue_task_list_use_case,
    get_task_use_case,
    get_task_template_use_case
)
