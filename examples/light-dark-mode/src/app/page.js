'use client';

import {
  Button,
  Checkbox,
  Form,
  FormGroup,
  FileUploader,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  Search,
  Select,
  SelectItem,
  TextArea,
  TextInput,
  Toggle,
  Stack,
  Theme,
} from '@carbon/react';
import React from 'react';
import Image from 'next/image';
import styles from '../scss/Home.module.css';
import { useThemePreference } from '../components/ThemePreference';

export default function Home() {
  const { theme, setTheme } = useThemePreference();
  const checkboxEvents = {
    className: 'some-class',
    labelText: 'Checkbox label',
  };

  const fieldsetCheckboxProps = () => ({
    className: 'some-class',
    legendText: 'Checkbox heading',
  });

  const numberInputProps = {
    className: 'some-class',
    id: 'number-input-1',
    label: 'Number Input',
    iconDescription: 'Increment/decrement number',
    min: 0,
    max: 100,
    value: 50,
    step: 10,
  };

  const toggleProps = {
    labelText: 'Toggle label',
    labelA: 'On',
    labelB: 'Off',
    className: 'some-class',
    hideLabel: true,
  };

  const fieldsetToggleProps = {
    className: 'some-class',
    legendText: 'Toggle heading',
  };

  const fileUploaderEvents = {
    buttonLabel: 'Add files',
    className: 'some-class',
  };

  const fieldsetFileUploaderProps = {
    className: 'some-class',
    legendText: 'File Uploader',
  };

  const radioProps = {
    className: 'some-class',
  };

  const fieldsetRadioProps = {
    className: 'some-class',
    legendText: 'Radio Button heading',
  };

  const searchProps = {
    className: 'some-class',
    size: 'md',
  };

  const fieldsetSearchProps = {
    className: 'some-class',
    legendText: 'Search',
  };

  const selectProps = {
    className: 'some-class',
  };

  const TextInputProps = {
    className: 'some-class',
    id: 'test2',
    labelText: 'Text Input label',
    placeholder: 'Placeholder text',
  };

  const PasswordProps = {
    className: 'some-class',
    id: 'test3',
    labelText: 'Password',
  };

  const InvalidPasswordProps = {
    className: 'some-class',
    id: 'test4',
    labelText: 'Password',
    invalid: true,
    invalidText:
      'Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.',
  };

  const textareaProps = {
    labelText: 'Text Area label',
    className: 'some-class',
    placeholder: 'Placeholder text',
    id: 'test5',
    cols: 50,
    rows: 4,
  };

  const buttonEvents = {
    className: 'some-class',
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Toggle
          onToggle={() => {
            if (theme === 'g10') {
              setTheme('g100');
            }
            if (theme === 'g100') {
              setTheme('g10');
            }
          }}
          labelText="Theme Switcher"
          labelA="Light"
          labelB="Dark"
          id="toggle-1"
        />
        <Theme theme={theme}>
          <section className="theme-section">
            <Form>
              <Stack gap={7}>
                <FormGroup {...fieldsetCheckboxProps()}>
                  <Checkbox
                    defaultChecked
                    {...checkboxEvents}
                    id="checkbox-0"
                  />
                  <Checkbox {...checkboxEvents} id="checkbox-1" />
                  <Checkbox disabled {...checkboxEvents} id="checkbox-2" />
                </FormGroup>
                <NumberInput {...numberInputProps} />
                <FormGroup {...fieldsetToggleProps}>
                  <Stack gap={3}>
                    <Toggle {...toggleProps} id="toggle-4" />
                    <Toggle disabled {...toggleProps} id="toggle-2" />
                  </Stack>
                </FormGroup>

                <FormGroup {...fieldsetFileUploaderProps}>
                  <FileUploader
                    {...fileUploaderEvents}
                    id="file-1"
                    iconDescription="Clear uploaded file"
                    labelDescription="Choose Files..."
                  />
                </FormGroup>
                <FormGroup {...fieldsetRadioProps}>
                  <RadioButtonGroup
                    name="radio-button-group"
                    defaultSelected="default-selected">
                    <RadioButton
                      value="standard"
                      id="radio-1"
                      labelText="Standard Radio Button"
                      {...radioProps}
                    />
                    <RadioButton
                      value="default-selected"
                      labelText="Default Selected Radio Button"
                      id="radio-2"
                      {...radioProps}
                    />
                    <RadioButton
                      value="blue"
                      labelText="Standard Radio Button"
                      id="radio-3"
                      {...radioProps}
                    />
                    <RadioButton
                      value="disabled"
                      labelText="Disabled Radio Button"
                      id="radio-4"
                      disabled
                      {...radioProps}
                    />
                  </RadioButtonGroup>
                </FormGroup>
                <FormGroup {...fieldsetSearchProps}>
                  <Search
                    {...searchProps}
                    id="search-1"
                    labelText="Search"
                    placeholder="Search"
                  />
                </FormGroup>
                <Select
                  {...selectProps}
                  id="select-1"
                  defaultValue="placeholder-item">
                  <SelectItem
                    disabled
                    hidden
                    value="placeholder-item"
                    text="Choose an option"
                  />
                  <SelectItem value="option-1" text="Option 1" />
                  <SelectItem value="option-2" text="Option 2" />
                  <SelectItem value="option-3" text="Option 3" />
                </Select>
                <TextInput {...TextInputProps} />
                <TextInput
                  type="password"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  {...PasswordProps}
                />
                <TextInput
                  type="password"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  {...InvalidPasswordProps}
                />
                <TextArea {...textareaProps} />
                <Button type="submit" className="some-class" {...buttonEvents}>
                  Submit
                </Button>
              </Stack>
            </Form>
          </section>
        </Theme>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
