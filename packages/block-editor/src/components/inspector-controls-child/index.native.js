/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';
import { createSlotFill, BottomSheetConsumer } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'InspectorControlsChild' );

const FillWithSettingsButton = ( { children, button, showSheet } ) => {
	return (
		<>
			<Fill>
				{ showSheet && (
					<BottomSheetConsumer>
						{ () => children }
					</BottomSheetConsumer>
				) }
			</Fill>
			{ Children.count( children ) > 0 && button }
		</>
	);
};

const InspectorControlsChild = FillWithSettingsButton;

InspectorControlsChild.Slot = Slot;
InspectorControlsChild.screenName = 'SettingSubpage';

export default InspectorControlsChild;
