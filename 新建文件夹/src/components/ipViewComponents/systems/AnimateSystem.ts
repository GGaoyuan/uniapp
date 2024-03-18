import { defineSystem } from '@/components/ipViewComponents/define';
import { createQuery, EntityId, With } from 'titav';
import { PlayerC, PositionC, AnimateC, StateC } from '../sysComponents/IpComponent';
import { AniType, gameState} from '@/constants/MainPageConstants';
import { fadeToAction } from '@/utils/system/animateSysUtils';
import { messageCenter } from '../core/message/MessageCenter';

const aniQuery = createQuery([AnimateC, StateC], With(PlayerC));
export const animateSystem = defineSystem((params) => {
  let {
    world,
    mixer,
    actions,
    activeAction,
    orbit
  } = params;

  for (const [aniC, stateC] of aniQuery.exec(world)) {
    if (!aniC.frameId) {
      return;
    }

    if (gameState.playEnd) {
      if (aniC.frameId !== AniType.RIGHT) {
        return;
      }
    }
    
    orbit.reset(true);
    
    let newActive = fadeToAction(aniC.frameId, 0.2, activeAction, actions);
    if (!newActive._loop) {
      gameState.playEnd = true;
      mixer.addEventListener( 'finished', restoreState.bind(this, mixer, aniC));
    } else {
      gameState.playEnd = false;
    }

    aniC.frameId = null;
  }
});

function restoreState (mixer, aniC) {
  mixer.removeEventListener( 'finished', restoreState);
  aniC.frameId = AniType.IDLE;
  gameState.playEnd = false;
  messageCenter.dispatch('startIdleAniTimer');
}