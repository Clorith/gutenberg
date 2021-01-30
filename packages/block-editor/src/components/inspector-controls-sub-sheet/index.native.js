/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';
import { createSlotFill, BottomSheetConsumer } from '@wordpress/components';

const { Fill, Slot } = createSlotFill( 'InspectorControlsSubSheet' );

const InspectorControlsSubSheet = ( {
	children,
	button,
	showSheet,
	isFullScreen,
} ) => {
	return (
		<>
			{ showSheet && (
				<Fill>
					<BottomSheetConsumer>
						{ ( { setIsFullScreen } ) => {
							setIsFullScreen( isFullScreen );
							return children;
						} }
					</BottomSheetConsumer>
				</Fill>
			) }
			{ Children.count( children ) > 0 && button }
		</>
	);
};

InspectorControlsSubSheet.Slot = Slot;
InspectorControlsSubSheet.screenName = 'SettingSubSheet';

export default InspectorControlsSubSheet;
