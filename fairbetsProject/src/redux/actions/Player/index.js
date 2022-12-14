export const GamePlayer = ({gamedata, gameurl, Ratio = 1.32}) => {
    return dispath => {
        dispath({
            type : "GAME_PLAYER",
            gamedata,
            gameurl,
            Ratio,
            state : true
        })
    }
}

export const GameExit = (state) => {
    return dispath => {
        dispath({
            type : "GAME_EXIT",
            payload : false
        })
    }
}