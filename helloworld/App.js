import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require('./assets/logo.png')}/>
			<Text style={styles.textHeader}>
				Maersk Line
			</Text>
			<Text style={styles.textBody}>
				Vi gyder olie på vandene{'\n'}
				11/10 på TrustPilot{'\n'}
			</Text>
			<StatusBar style="auto"/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34c6eb',
		alignItems: 'center',
		justifyContent: 'center',
  	},
  	textBody: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 20,
		lineHeight: 35
  	},
	textHeader: {
		color: '#fff',
		textAlign: 'center',
		padding: 25,
		fontWeight: 'bold',
		fontSize: 50
	},
	image: {
		width: 150,
		height: 150
	}
});
