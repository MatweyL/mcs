import {CloseMenuActionProcessor} from "./impl/close_menu_action_processor";
import {CloseSelectBoxActionProcessor} from "./impl/close_select_box_action_processor";
import {EraseActionProcessor} from "./impl/erase_action_processor";
import {OpenMenuActionProcessor} from "./impl/open_menu_action_processor";
import {OpenSelectBoxActionProcessor} from "./impl/open_select_box_action_processor";
import {UpActionProcessor} from "./impl/up_action_processor";
import {DownActionProcessor} from "./impl/down_action_processor";
import {EditActionProcessor} from "./impl/edit_action_processor";
import {SelectBoxOptionSelector} from "../../selector/select_box_option_selector";
import {MultiButtonOptionSelector} from "../../selector/multi_button_option_selector";
import {AttributeSelector} from "../../selector/attribute_selector";
import {NextCalculator} from "../../calculator/next_calculator";
import {ButtonsFactory} from "../../button/buttons_updater";
import {EventProcessor} from "../../event/event_processor";
import {InitActionProcessor} from "./impl/init_action_processor";
import {SaveSelectedActionProcessor} from "./impl/save_selected_action_processor";
import {UpdateAttributeActionProcessor} from "./impl/update_attribute_action_processor";
import {PressKeyActionProcessor} from "./impl/press_key_action_processor";


class ActionProcessorRegistry {
    process(state, action) {
        return processors.find(p => p.getType() === action.type)
            .process(state, action);
    }
}
export const actionProcessorRegistry = new ActionProcessorRegistry();

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

const processors = [
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