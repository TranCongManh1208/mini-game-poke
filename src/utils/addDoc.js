

function achievementses(uid, mid) {
    const achievements = {
        uid: uid,
        mid: mid,
        startTime: new Date().getTime(),
        endTime: 0,
        complete: false,
        modes: [
            {
                id: 16,
                mode: "4x4",
                timer: 0,
                date: 0,
            },
            {
                id: 36,
                mode: "6x6",
                timer: 0,
                date: 0,
            },
            {
                id: 64,
                mode: "8x8",
                timer: 0,
                date: 0,
            },
            {
                id: 100,
                mode: "10x10",
                timer: 0,
                date: 0,
            },
        ],
    }
    return { achievements };
}


export default achievementses;