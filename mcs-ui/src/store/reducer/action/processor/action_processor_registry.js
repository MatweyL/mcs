import {CloseMenuActionProcessor} from "./impl/close_menu_action_processor";
import {CloseSelectBoxActionProcessor} from "./impl/close_select_box_action_processor";
import {EraseActionProcessor} from "./impl/erase_action_processor";
import {OpenActionProcessor} from "./impl/open_action_processor";
import {OpenMenuActionProcessor} from "./impl/open_menu_action_processor";
import {OpenSelectBoxActionProcessor} from "./impl/open_select_box_action_processor";
import {UpActionProcessor} from "./impl/up_action_processor";
import {DownActionProcessor} from "./impl/down_action_processor";
import {EditActionProcessor} from "./impl/edit_action_processor";
import {SelectBoxOptionSelector} from "../../selector/select_box_option_selector";
import {MultiButtonOptionSelector} from "../../selector/multi_button_option_selector";
import {AttributeSelector} from "../../selector/attribute_selector";
import {NextCalculator} from "../../calculator/next_calculator";
import {ButtonsUpdater} from "../../button/buttons_updater";

class ActionProcessorRegistry {
    process(state, action) {
        processors.find(p => p.getType() === action.type)
            .process(state, action);
    }
}

const calculator = new NextCalculator();
const buttonsUpdater = new ButtonsUpdater();

const selectors = [
    new SelectBoxOptionSelector(calculator),
    new MultiButtonOptionSelector(calculator),
    new AttributeSelector(buttonsUpdater, calculator),
];

const processors = [
    new CloseMenuActionProcessor(),
    new CloseSelectBoxActionProcessor(),
    new EraseActionProcessor(),
    new EditActionProcessor(),
    new OpenActionProcessor(),
    new OpenMenuActionProcessor(),
    new OpenSelectBoxActionProcessor(),
    new UpActionProcessor(selectors),
    new DownActionProcessor(selectors)
]