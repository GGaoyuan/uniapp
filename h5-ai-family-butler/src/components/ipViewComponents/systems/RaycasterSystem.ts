import { defineSystem } from '@/components/ipViewComponents/define';
import { createQuery, EntityId, With } from 'titav';
import { PlayerC, PositionC, TouchC } from '../sysComponents/IpComponent';
import { AniType } from '@/constants/MainPageConstants';
import { messageCenter } from '../core/message/MessageCenter';

const rayQuery = createQuery([TouchC, PositionC], With(PlayerC));

export const RaycasterSystem = defineSystem((params) => {
    let {
        world,
        _THREE,
        camera,
        scene,
        model,
        raycaster
    } = params;
    
    let touch_branch = null;
    for (let [touch, pos] of rayQuery.exec(world)) {
       
        if (touch.touched && pos.value) {
            touch_branch = touch;
            
            raycaster.setFromCamera( pos.value, camera );
            let intersections = raycaster.intersectObject(model, true);
            
            if ( intersections.length > 0) {
                // 触发交互
                messageCenter.dispatch('rayIntersectedModel', true);
                touch.touched = false;
            }
            
            // fixme 
            // for(const intersect of intersections){
            //     intersect.object.material.color.set('#0000ff');
            // }
        }
    }
    touch_branch && (touch_branch.touched = false);
    touch_branch = null;
});
