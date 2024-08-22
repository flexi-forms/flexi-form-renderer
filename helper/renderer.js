import { Fragment } from 'react';
import Panel from './../components/common/Panel';
import BooleanInput from './../components/forms/BooleanInput';
import DateInput from './../components/forms/DateInput';
import InputField from './../components/forms/InputField';
import SelectField from './../components/forms/Select';
import CheckBox from './../components/forms/CheckBox';
import RadioGroup from './../components/forms/RadioGroup';
import FileUpload from './../components/forms/FileUpload';
import Textarea from './../components/forms/TextArea';
import Matrix from './../components/forms/Matrix';

export const renderElement = element => {
	switch (element.type) {
		case 'panel':
			return <Panel element={element} >
				{element?.elements?.map(detail => (
					<Fragment key={detail.name}>{renderElement(detail)}</Fragment>
				))}
			</Panel>;
		case 'text':
		case 'number':
			return (
				<InputField
					id={element.name}
					type={element.type}
					required={element.isRequired}
					maxLength={element.maxLength}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					visibleIf={element.visibleIf}
				/>
			);
		case 'textarea':
			return (
				<Textarea
					id={element.name}
					type={element.type}
					required={element.isRequired}
					maxLength={element.maxLength}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					visibleIf={element.visibleIf}
				/>
			);
		case 'checkbox':
			return (
				<CheckBox
					id={element.name}
					options={element.choices}
					required={element.isRequired}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					showNoneItem={element.showNoneItem}
					showOtherItem={element.showOtherItem}
					noneText={element.noneText}
					otherText={element.otherText}
					visibleIf={element.visibleIf}
				/>
			);
		case 'radiogroup':
			return (
				<RadioGroup
					id={element.name}
					options={element.choices}
					required={element.isRequired}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					visibleIf={element.visibleIf}
				/>
			);
		case 'boolean':
			return (
				<BooleanInput
					id={element.name}
					type="date"
					required={element.isRequired}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					labelPosition={element.labelPosition}
					span={element.span}
					visibleIf={element.visibleIf}
				/>
			);
		case 'date':
			return (
				<DateInput
					id={element.name}
					type="date"
					required={element.isRequired}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					visibleIf={element.visibleIf}
				/>
			);
		case 'file':
			return (
				<FileUpload
					id={element.name}
					required={element.isRequired}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					maxFiles={1}
				/>
			);
		case 'dropdown':
			return (
				<SelectField
					id={element.name}
					type="select"
					required={element.isRequired}
					placeholder={element.placeholder}
					name={element.name}
					label={element.title}
					span={element.span}
					options={element.choices}
					visibleIf={element.visibleIf}
				/>
			);

		case 'matrix':
			return (
				<Matrix
					id={element.type}
					type={element.type}
					columns={element.columns}
					rows={element.rows}
					label={element.title}
					isAllRowRequired={element.isAllRowRequired}
					name={element.name}
				/>
			);

		default:
			return null;
	}
};