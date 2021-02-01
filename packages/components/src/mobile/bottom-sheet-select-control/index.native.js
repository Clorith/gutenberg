/**
 * WordPress dependencies
 */
import { InspectorControlsChild } from '@wordpress/block-editor';
import { check } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Cell from '../bottom-sheet/cell';

const BottomSheetSelectControl = ( {
	label,
	options: items,
	onChange,
	value: selectedValue,
} ) => {
	const onChangeValue = ( value ) => {
		return () => {
			onChange( value );
		};
	};

	const selectedOption = items.find(
		( option ) => option.value === selectedValue
	);

	return (
		<InspectorControlsChild
			label={ label }
			button={
				<Cell
					label={ label }
					separatorType="none"
					value={ selectedOption.label }
				/>
			}
		>
			{ items.map( ( item, index ) => (
				<Cell
					label={ item.label }
					onPress={ onChangeValue( item.value ) }
					leftAlign={ true }
					key={ index }
					style
					icon={ item.value === selectedValue ? check : null }
				/>
			) ) }
		</InspectorControlsChild>
	);
};

export default BottomSheetSelectControl;
