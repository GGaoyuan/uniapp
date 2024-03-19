import { LevelType } from '@/constants/MainPageConstants';
import { defineComponent } from 'titav';
// import Vec2 from 'vec2';

export const PlayerC = defineComponent();

export const AnimateC = defineComponent(() => ({ 
    frameId: null
}));
export const StateC = defineComponent(() => ({
    stateId: true,
    levelId: LevelType.NONE
}));
export const VelocityC = defineComponent(() => ({ value: {x:0, y:0} }));

// 公共组件
export const SizeC = defineComponent(() => ({ value: 0 }));
export const ColorC = defineComponent(() => ({ value: 0xffffff }));
export const PositionC = defineComponent(() => ({ value: {x:0, y:0} }));
export const TouchC =  defineComponent(() => ({ touched: false}));