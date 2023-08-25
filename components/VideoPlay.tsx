import { Video, ResizeMode } from "expo-av";

export function VideoPlay(props) {
  return (
    <Video
      ref={props.video}
      className="mt-4"
      style={{
        alignSelf: "center",
        marginHorizontal: "auto",
        borderWidth: 2,
        width: 300,
        height: 400,
      }}
      resizeMode={ResizeMode.STRETCH}
      source={{
        uri: props.imageUrl,
      }}
      useNativeControls={true} // resizeMode={ResizeMode.CONTAIN}
      // onPlaybackStatusUpdate={status => setStatus(() => status)}
    />
  );
}
