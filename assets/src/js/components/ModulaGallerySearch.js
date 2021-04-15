const { __ } = wp.i18n;
const { Component, Fragment, useEffect, useState } = wp.element;
const { withSelect } = wp.data;
const { SelectControl, Button, Spinner, Toolbar, IconButton } = wp.components;
const { BlockControls } = wp.editor;
const { compose } = wp.compose;
const { __experimentalInputControl } = wp.components;

export const ModulaGallerySearch = (props) => {
	const { onIdChange, id } = props;
	useEffect(() => {
		jQuery('.modula-gallery-input').selectize({
			valueField: 'value',
			labelField: 'label',
			searchField: [ 'label', 'value' ],
			create: false,
			maxItems: 1,
			preload: true,
			allowEmptyOptions: true,
			closeAfterSelect: true,
			render: {
				option: function(item, escape) {
					return (
						'<div>' +
						'<span class="title">' +
						'<span class="name">' +
						escape(item.label) +
						'</span>' +
						'</div>'
					);
				}
			},
			load: function(query, callback) {
				if (!query.length) return callback();
				jQuery.ajax({
					url: modulaVars.ajaxURL,
					type: 'GET',
					data: {
						action: 'modula_get_gallery',
						nonce: modulaVars.nonce,
						term: query
					},
					success: (res) => {
						callback(res.slice(0, 10));
					}
				});
			},
			onChange: (value) => {
				if (isNaN(value) || '' == value) {
					return;
				} else {
					onIdChange(value);
				}
			}
		});
	}, []);

	const getLabelValue = () => {
		jQuery('.modula-gallery-input ');
	};

	return (
		<input
			type="select-one"
			className="modula-gallery-input"
			placeholder="Please type your gallery name or id"
			value={'0' == id ? '' : id}
		/>
	);
};

export default ModulaGallerySearch;
