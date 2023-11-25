import Actions from "../../../../constants/actions";
import {DirectionActionProcessor} from "./direction_action_processor";

export class UpActionProcessor extends DirectionActionProcessor {
    getType() {return Actions.UP;}
}