/**
 * External dependencies
 */
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * WordPress dependencies
 */
import { Children, useState } from '@wordpress/element';
import {
	createSlotFill,
	BottomSheetConsumer,
	NavigationHeader,
} from '@wordpress/components';
import { Icon, chevronRight } from '@wordpress/icons';

const { Fill, Slot } = createSlotFill( 'InspectorControlsChild' );

const BottomSheetWrapperView = ( { children, label, onCancel } ) => {
	return (
		<SafeAreaView>
			<NavigationHeader screen={ label } leftButtonOnPress={ onCancel } />
			<View>{ children }</View>
		</SafeAreaView>
	);
};

const FillWithSettingsButton = ( { children, label, button } ) => {
	const [ showBottomSheet, setShowBottomSheet ] = useState( false );

	const navigation = useNavigation();

	const onPressLabel = () => {
		setShowBottomSheet( true );
		navigation.navigate( 'SettingChild' );
	};

	const onCancel = () => {
		navigation.goBack();
		setShowBottomSheet( false );
	};

	return (
		<>
			<Fill>
				{ showBottomSheet && (
					<BottomSheetConsumer>
						{ () => (
							<BottomSheetWrapperView
								onCancel={ onCancel }
								label={ label }
							>
								{ children }
							</BottomSheetWrapperView>
						) }
					</BottomSheetConsumer>
				) }
			</Fill>
			{ Children.count( children ) > 0 && (
				<button.type { ...button.props } onPress={ onPressLabel }>
					<Icon icon={ chevronRight }></Icon>
				</button.type>
			) }
		</>
	);
};

const InspectorControlsChild = FillWithSettingsButton;

InspectorControlsChild.Slot = Slot;

export default InspectorControlsChild;
