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
import { Icon, chevronRight, check } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Cell from '../bottom-sheet/cell';
import NavigationHeader from '../bottom-sheet/navigation-header';

const BottomSheetSelectControl = ( {
	label,
	options: items,
	onChange,
	value: selectedValue,
} ) => {
	const [ showSubSheet, setShowSubSheet ] = useState( false );
	const navigation = useNavigation();

	const onChangeValue = ( value ) => {
		return () => {
			goBack();
			onChange( value );
		};
	};

	const selectedOption = items.find(
		( option ) => option.value === selectedValue
	);

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
					label={ label }
					separatorType="none"
					value={ selectedOption.label }
					onPress={ openSubSheet }
				>
					<Icon icon={ chevronRight }></Icon>
				</Cell>
			}
			showSheet={ showSubSheet }
		>
			<SafeAreaView>
				<NavigationHeader
					screen={ label }
					leftButtonOnPress={ goBack }
				/>
				<View paddingHorizontal={ 16 }>
					{ items.map( ( item, index ) => (
						<Cell
							customActionButton
							separatorType="none"
							label={ item.label }
							onPress={ onChangeValue( item.value ) }
							leftAlign={ true }
							key={ index }
						>
							{ item.value === selectedValue && (
								<Icon icon={ check }></Icon>
							) }
						</Cell>
					) ) }
				</View>
			</SafeAreaView>
		</InspectorControlsSubSheet>
	);
};

export default BottomSheetSelectControl;
