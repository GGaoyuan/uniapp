import { defineSystem } from '@/components/ipViewComponents/define';
import { createQuery, EntityId, With } from 'titav';
import { PlayerC, PositionC, StateC } from '../sysComponents/IpComponent';
import { ANILOOPS } from '@/constants/MainPageConstants';

const stateQuery = createQuery([StateC], With(PlayerC));

export const stateSystem = defineSystem((params) => {
  let {
    world,
    mixer,
    actions,
    activeAction,
    animateState,
    onNextFrameStart
  } = params;
  
  // TODO 后期用来记录状态
  // for (const [stateC] of stateQuery.exec(world)) {
  //   if (activeAction) {
  //   }
  // }
});
