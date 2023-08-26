export default function Orientation() {
    return screen.orientation.type.match(/\w+/)[0];
}