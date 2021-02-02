/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import {
	ToolSelector,
	BlockToolbar,
	__experimentalPreviewOptions as PreviewOptions,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { PinnedItems } from '@wordpress/interface';
import { _x, __ } from '@wordpress/i18n';
import { navigationMenu, plus } from '@wordpress/icons';
import { Button } from '@wordpress/components';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';

/**
 * Internal dependencies
 */
import MoreMenu from './more-menu';
import SaveButton from '../save-button';
import UndoButton from './undo-redo/undo';
import RedoButton from './undo-redo/redo';
import DocumentActions from './document-actions';
import TemplateDetails from '../template-details';

export default function Header( { openEntitiesSavedStates } ) {
	const {
		deviceType,
		entityTitle,
		hasFixedToolbar,
		template,
		templateType,
		isInserterOpen,
		isBlockNavigationOpen,
		blockNavigationShortcut,
	} = useSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType,
			isFeatureActive,
			getEditedPostType,
			getEditedPostId,
			isInserterOpened,
			isBlockNavigationOpened,
		} = select( 'core/edit-site' );
		const { getEntityRecord } = select( 'core' );
		const { __experimentalGetTemplateInfo: getTemplateInfo } = select(
			'core/editor'
		);
		const { getShortcutRepresentation } = select( keyboardShortcutsStore );

		const postType = getEditedPostType();
		const postId = getEditedPostId();
		const record = getEntityRecord( 'postType', postType, postId );
		const _entityTitle =
			'wp_template' === postType
				? getTemplateInfo( record ).title
				: record?.slug;

		return {
			deviceType: __experimentalGetPreviewDeviceType(),
			entityTitle: _entityTitle,
			hasFixedToolbar: isFeatureActive( 'fixedToolbar' ),
			template: record,
			templateType: postType,
			isInserterOpen: isInserterOpened(),
			isBlockNavigationOpen: isBlockNavigationOpened(),
			blockNavigationShortcut: getShortcutRepresentation(
				'core/edit-site/toggle-block-navigation'
			),
		};
	}, [] );

	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
		setIsInserterOpened,
		setIsBlockNavigationOpened,
	} = useDispatch( 'core/edit-site' );

	const isLargeViewport = useViewportMatch( 'medium' );
	const displayBlockToolbar =
		! isLargeViewport || deviceType !== 'Desktop' || hasFixedToolbar;

	return (
		<div className="edit-site-header">
			<div className="edit-site-header_start">
				<div className="edit-site-header__toolbar">
					<Button
						isPrimary
						isPressed={ isInserterOpen }
						className="edit-site-header-toolbar__inserter-toggle"
						onClick={ () =>
							setIsInserterOpened( ! isInserterOpen )
						}
						icon={ plus }
						label={ _x(
							'Add block',
							'Generic label for block inserter button'
						) }
					/>
					{ isLargeViewport && (
						<>
							<ToolSelector />
							<UndoButton />
							<RedoButton />
							<Button
								className="edit-site-header-toolbar__block-navigation-toggle"
								icon={ navigationMenu }
								isPressed={ isBlockNavigationOpen }
								/* translators: button label text should, if possible, be under 16 characters. */
								label={ __( 'Outline' ) }
								onClick={ () =>
									setIsBlockNavigationOpened(
										! isBlockNavigationOpen
									)
								}
								shortcut={ blockNavigationShortcut }
							/>
						</>
					) }
					{ displayBlockToolbar && (
						<div className="edit-site-header-toolbar__block-toolbar">
							<BlockToolbar hideDragHandle />
						</div>
					) }
				</div>
			</div>

			<div className="edit-site-header_center">
				{ 'wp_template' === templateType && (
					<DocumentActions
						entityTitle={ entityTitle }
						entityLabel="template"
					>
						{ ( { onClose } ) => (
							<TemplateDetails
								template={ template }
								onClose={ onClose }
							/>
						) }
					</DocumentActions>
				) }
				{ 'wp_template_part' === templateType && (
					<DocumentActions
						entityTitle={ entityTitle }
						entityLabel="template part"
					/>
				) }
			</div>

			<div className="edit-site-header_end">
				<div className="edit-site-header__actions">
					<PreviewOptions
						deviceType={ deviceType }
						setDeviceType={ setPreviewDeviceType }
					/>
					<SaveButton
						openEntitiesSavedStates={ openEntitiesSavedStates }
					/>
					<PinnedItems.Slot scope="core/edit-site" />
					<MoreMenu />
				</div>
			</div>
		</div>
	);
}
