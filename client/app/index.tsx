import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
	return (
		<SafeAreaView>
			<ScrollView
				contentContainerStyle={{
					height: "100%",
				}}
			>
				<View
					className="w-full flex-1 justify-center items-center h-full px-4"
					// style={styles.container}
				>
					<Text>Hi man</Text>
					<StatusBar style="auto" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
