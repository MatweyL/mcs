import {NextCalculator} from "./store/screen/calculator/next_calculator";
import {ButtonsFactory} from "./store/screen/button/buttons_updater";
import {EventProcessor} from "./store/screen/event/event_processor";
import {SelectBoxOptionSelector} from "./store/screen/selector/select_box_option_selector";
import {MultiButtonOptionSelector} from "./store/screen/selector/multi_button_option_selector";
import {AttributeSelector} from "./store/screen/selector/attribute_selector";
import {InitActionProcessor} from "./store/screen/action/processor/impl/init_action_processor";
import {OpenSelectBoxActionProcessor} from "./store/screen/action/processor/impl/open_select_box_action_processor";
import {CloseSelectBoxActionProcessor} from "./store/screen/action/processor/impl/close_select_box_action_processor";
import {SaveSelectedActionProcessor} from "./store/screen/action/processor/impl/save_selected_action_processor";
import {UpdateAttributeActionProcessor} from "./store/screen/action/processor/impl/update_attribute_action_processor";
import {OpenMenuActionProcessor} from "./store/screen/action/processor/impl/open_menu_action_processor";
import {CloseMenuActionProcessor} from "./store/screen/action/processor/impl/close_menu_action_processor";
import {UpActionProcessor} from "./store/screen/action/processor/impl/up_action_processor";
import {DownActionProcessor} from "./store/screen/action/processor/impl/down_action_processor";
import {EditActionProcessor} from "./store/screen/action/processor/impl/edit_action_processor";
import {EraseActionProcessor} from "./store/screen/action/processor/impl/erase_action_processor";
import {PressKeyActionProcessor} from "./store/screen/action/processor/impl/press_key_action_processor";
import {ScreenService} from "./store/screen/screen_service";
import {ActionProcessorRegistry} from "./store/screen/action/processor/action_processor_registry";

export const screenService = new ScreenService();

const calculator = new NextCalculator();
const buttonsFactory = new ButtonsFactory();
const eventProcessor = new EventProcessor();

//FIXME: На данный момент порядок селектор в  массиве имеет значение
// последним всегда должен быть AttributeSelector
const selectors = [
    new SelectBoxOptionSelector(calculator),
    new MultiButtonOptionSelector(calculator),
    new AttributeSelector(buttonsFactory, calculator),
];

export const processors = [
    new InitActionProcessor(buttonsFactory, eventProcessor),

    new OpenSelectBoxActionProcessor(),
    new CloseSelectBoxActionProcessor(),

    new SaveSelectedActionProcessor(eventProcessor),
    new UpdateAttributeActionProcessor(eventProcessor),

    new OpenMenuActionProcessor(),
    new CloseMenuActionProcessor(),

    new UpActionProcessor(selectors),
    new DownActionProcessor(selectors),

    new EditActionProcessor(),
    new EraseActionProcessor(),

    new PressKeyActionProcessor(calculator)
]

export const actionProcessorRegistry = new ActionProcessorRegistry(processors);
