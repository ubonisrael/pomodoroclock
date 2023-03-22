export default function Format(time) {
    //time is in seconds
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const min = minutes >= 10 ? minutes : `0${minutes}`
    const sec = seconds >= 10 ? seconds : `0${seconds}`

    return `${min} : ${sec}`
}