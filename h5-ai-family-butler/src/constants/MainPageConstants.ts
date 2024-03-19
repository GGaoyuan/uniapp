
export const enum AniType {
    // 待机
    IDLE = 'ip_idle',

    // 空闲状态
    DANCE = 'ip_dance',
    SLEEP = 'ip_sleep',
    HOLIDAY = 'ip_holiday',

    // 交互
    RIGHT = 'ip_topRight',
    // MISS = 'ip_topMiss',
    ERROR = 'ip_topError',
    // IN = 'ip_in',

    // 点击
    CLICK = 'ip_click1',
    LOVER = 'ip_lover',
    BOOM = 'ip_boom',
    MONEY = 'ip_money',
    God = 'ip_GodOfWealt'

}

export const ScreenInfo = {
    screenW: 0,
    screenH: 0
}

export const enum LevelType {
    MASTER,
    MANAGER,
    PUBLIC,
    PRIVATE,
    NONE
};

export const ANILOOPS = {
    LOOP: 0
};

export const gameState = {
    playEnd: false
}

export var isGuide= {
  isGuide: false
};

