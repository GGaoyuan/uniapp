import { createQuery, With} from 'titav';
import { PlayerC, AnimateC, StateC } from '@/components/ipViewComponents/sysComponents/IpComponent';
import { messageCenter } from '@/components/ipViewComponents/core/message/MessageCenter';

var previousAction;
export function fadeToAction (name, duration: number = 0.5, activeAction, actions) {
  previousAction = activeAction;
  activeAction = actions[name];

  messageCenter.dispatch('changeAction', activeAction);
  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }
  
  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
  return activeAction;
}

export function changePlayerAnimateC (world, name) {
  const aniQuery = createQuery([AnimateC, StateC], With(PlayerC));
  for (const [aniC, stateC] of aniQuery.exec(world)) {
    aniC.frameId = name;
  }
}

export function getCurrentAnimateFrame (world) {
  const aniQuery = createQuery([AnimateC, StateC], With(PlayerC));
  for (const [aniC, stateC] of aniQuery.exec(world)) {
    return aniC.frameId;
  }
  return null;
}