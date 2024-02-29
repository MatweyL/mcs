import os.path

from service.common.mapper import Mapper
from service.common.utils import get_root_path
from service.core.auth.filter import AuthFilter
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
from service.core.screen.processor.save import ChannelEditorSaveScreenProcessor
from service.core.screen.processor.save.direction_editor_save_screen_processor import DirectionEditorSaveScreenProcessor
from service.core.screen.processor.save.save_screen_processor_registry import SaveScreenProcessorRegistry
from service.core.session import SessionEndpoint
from service.core.session.impl.repo import InMemorySessionRepo
from service.core.session.impl.use_case import GetSessionListUseCaseImpl, CreateSessionUseCaseImpl
from service.core.user.endpoint import UserEndpoint
from service.core.user.impl.repo import InMemoryUserRepo
from service.core.user.impl.use_case import RegisterUserUseCaseImpl, AuthenticateUserUseCaseImpl, LoginUserUseCaseImpl
from service.db.db import JsonDb
from service.mapper_v2.mapper import ChannelMapper, DirectionMapper, PhoneMapper, SessionMapper, UserMapper, GroupMapper

save_screen_processor_registry = SaveScreenProcessorRegistry([ChannelEditorSaveScreenProcessor(),
                                                              DirectionEditorSaveScreenProcessor()])

db_json_path = get_root_path().joinpath('service/db/db.json')
db = JsonDb(db_json_path)
mapper = Mapper()

get_screen_processor_registry = GetScreenProcessorRegistry([ChannelListGetScreenProcessor(),
                                                            ChannelEditorGetScreenProcessor(),
                                                            DirectionListGetScreenProcessor(),
                                                            DirectionEditorGetScreenProcessor()],
                                                           DefaultGetScreenProcessor())

screens_dir_path = get_root_path().joinpath('mcs-ui/public/screen')  # TODO: migrate to storage (mongo, redis, pg)
screens_storage = FileSystemScreenRepo(screens_dir_path)

channel_mapper = ChannelMapper()
direction_mapper = DirectionMapper()
phone_mapper = PhoneMapper(channel_mapper, direction_mapper)
session_mapper = SessionMapper(phone_mapper)

session_repo = InMemorySessionRepo(db, session_mapper)

save_screen_use_case = SaveScreenUseCaseImpl(session_repo, save_screen_processor_registry)
get_screen_use_case = GetScreenUseCaseImpl(session_repo, get_screen_processor_registry, screens_storage)

screen_endpoint = ScreenEndpoint(
    save_screen_use_case,
    get_screen_use_case
)

user_mapper = UserMapper()
user_repo = InMemoryUserRepo(db, user_mapper)
auth_filter = AuthFilter(user_repo)

register_user_use_case = RegisterUserUseCaseImpl(user_repo, mapper)
authenticate_user_use_case = AuthenticateUserUseCaseImpl(user_repo)
login_user_use_case = LoginUserUseCaseImpl(user_repo)

user_endpoint = UserEndpoint(
    register_user_use_case,
    authenticate_user_use_case,
    login_user_use_case
)

get_session_list_use_case = GetSessionListUseCaseImpl(session_repo)
create_session_use_case = CreateSessionUseCaseImpl(session_repo)

session_endpoint = SessionEndpoint(
    get_session_list_use_case,
    create_session_use_case
)

default_dictionary_provider = DefaultDictionaryProvider(os.path.join(get_root_path(), 'mcs-ui/public/dictionary'))
get_dictionary_provider_registry = GetDictionaryProviderRegistry([StatefulChannelDictionaryProvider()],
                                                                 default_dictionary_provider)

get_dictionary_use_case = GetDictionaryUseCaseImpl(session_repo,
                                                   get_dictionary_provider_registry)
dictionary_endpoint = DictionaryEndpoint(get_dictionary_use_case)

group_mapper = GroupMapper()
group_repo = GroupRepoImpl(db, group_mapper, user_mapper)

get_group_list_use_case = GetGroupListUseCaseImpl(group_repo)
get_user_list_by_group_use_case = GetUserListByGroupUseCaseImpl(group_repo)
group_endpoint = GroupEndpoint(
    get_group_list_use_case,
    get_user_list_by_group_use_case
)
