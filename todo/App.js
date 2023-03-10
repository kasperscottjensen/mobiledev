import React, {useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {

	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task]);
		setTask(null);
	}

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	}

	return (
		<View style={styles.container}>
			<View style={styles.taskWrapper}>
				<Text style={styles.sectionTitle}>Get these done, lazy!</Text>
				<Text style={styles.sectionComment}>Click the thing when it's done.</Text>
				<View style={styles.taskList}>
					{taskItems.map((item, index) => {
						return (
							<TouchableOpacity key={index} onPress={() => completeTask(index)}>
								<Task text={item}/>
							</TouchableOpacity>
						) 						
					})}
				</View>
			</View>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.textInputWrapper}>
				<TextInput styles={styles.textInput} placeholder={'What to do?'} value={task} onChangeText={text => setTask(text)} multiline={false} maxLength={40}/>
				<TouchableOpacity onPress={() => handleAddTask()}>
					<View style={styles.addTaskWrapper}>
						<Text style={styles.addTask}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34d5eb'
	},
	taskWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20
	},
	sectionTitle: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	sectionComment: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center'
	},
	taskList: {
		marginTop: 50
	},
	textInputWrapper: {
		backgroundColor: '#fff',
		position: 'absolute',
		bottom: 20,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingStart: 50
	},
	textInput: {
		paddingVertical: 15,
		paddingHorizontal: 15
	},
	addTaskWrapper: {
		height: 60,
		width: 60,
		justifyContent: 'center',
		alignItems: 'center',
		paddingEnd: 35
	},
	addTask: {
		color: '#0f5396',
		fontSize: 30
	}
});
