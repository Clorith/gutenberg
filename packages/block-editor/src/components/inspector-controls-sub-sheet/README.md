# InspectorControlsSubSheet

Inspector Controls Sub Sheet allows for adding controls inside the React Native bottom sheet settings. 

### Usage

```jsx
/**
 * External dependencies
 */
import { SafeAreaView, View } from 'react-native';

/**
 * WordPress dependencies
 */
import { InspectorControlsSubSheet } from '@wordpress/block-editor';
import { useNavigation } from '@react-navigation/native';
import { useState } from '@wordpress/element';
import { Icon, chevronRight } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Cell from '../bottom-sheet/cell';
import NavigationHeader from '../bottom-sheet/navigation-header';

const ExampleControl = () => {
	const [ showSubSheet, setShowSubSheet ] = useState( false );
	const navigation = useNavigation();

	const goBack = () => {
		setShowSubSheet( false );
		navigation.goBack();
	};

	const openSubSheet = () => {
		navigation.navigate( InspectorControlsSubSheet.screenName );
		setShowSubSheet( true );
	};

	return (
		<InspectorControlsSubSheet
			button={
				<Cell
					label={ 'Howdy' }
					separatorType="none"
					onPress={ openSubSheet }
				>
					<Icon icon={ chevronRight }></Icon>
				</Cell>
			}
			showSheet={ showSubSheet }
		>
			<SafeAreaView>
				<NavigationHeader
					screen={ 'Howdy' }
					leftButtonOnPress={ goBack }
				/>
				<View paddingHorizontal={ 16 }>
					<Text>{ 'World' }</Text>
				</View>
			</SafeAreaView>
		</InspectorControlsSubSheet>
	);
};

export default ExampleControl;
```

### Props

#### showSheet

Wether to show or hide the Bottom Sheet content. 

-   Type: `Boolean`
-   Required: Yes

#### button

Is used for clicking to display the Bottom Sheet.

-   Type: `ReactComponent`
-   Required: Yes


#### isFullScreen

Is used for clicking to display the Bottom Sheet.

-   Type: `Boolean`
-   Required: Yes

See `BottomSheetSelectControl` as an example.