import { createQuery, With} from 'titav';
// import Vec2 from 'vec2';
import { PositionC, TouchC } from '@/components/ipViewComponents/sysComponents/IpComponent';

export function changePositionC_with_touchC (world, vec2: {x: number, y: number}) {
    const aniQuery = createQuery([PositionC], With(TouchC));
    for (const [pos] of aniQuery.exec(world)) {
        if (vec2 && vec2.x) {
            pos.value = {x: vec2.x, y: vec2.y};
        } else {
            pos.value = null;
        }
    }
}
