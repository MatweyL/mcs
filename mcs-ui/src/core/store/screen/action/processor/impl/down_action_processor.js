import {DirectionActionProcessor} from "./direction_action_processor";
import Actions from "../../../../../constants/actions";

export class DownActionProcessor extends DirectionActionProcessor {
    getType() {return Actions.DOWN;}
}