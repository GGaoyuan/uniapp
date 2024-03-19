import type { World } from 'titav';

export interface GameState {
    world: World;
    _THREE: any;
    mixer: any;
    actions: Object;
    activeAction: any;
    animateState: any;
    onNextFrameStart: (fn: () => void) => () => void;
    camera: any;
    scene: any;
    model: any;
    raycaster: any;
    orbit: any;
}
  
export type System = (state: GameState) => void;

// declare module '*.glb'
// {
//     const str: string;
//     export default str;
// }