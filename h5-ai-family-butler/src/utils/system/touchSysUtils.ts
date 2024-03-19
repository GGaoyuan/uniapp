import { createQuery, With} from 'titav';
import { PlayerC, PositionC, TouchC } from '@/components/ipViewComponents/sysComponents/IpComponent';

export function changePlayerTouchC (world, touched: boolean) {
    const touchQuery = createQuery([TouchC, PositionC], With(PlayerC));
    
    for (const [touch, pos] of touchQuery.exec(world)) {
       touch.touched = touched;
    }
}
