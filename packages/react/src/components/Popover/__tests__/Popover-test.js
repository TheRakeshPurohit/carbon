/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Popover, PopoverContent } from '../../Popover';
import userEvent from '@testing-library/user-event';
import { waitForPosition } from '../../ListBox/test-helpers';

const prefix = 'cds';

describe('Popover', () => {
  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <Popover open ref={ref}>
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  it('should support custom rendering with the `as` prop', () => {
    const { container } = render(
      <Popover as="article" open data-testid="test">
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(container.firstChild.tagName).toBe('ARTICLE');
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <Popover className="test" open>
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should forward additional props on the outermost element', () => {
    const { container } = render(
      <Popover data-testid="test" open>
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  describe('PopoverContent', () => {
    it('should support a ref on the popover-content element', () => {
      const ref = jest.fn();
      const { container } = render(
        <PopoverContent ref={ref}>test</PopoverContent>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild.firstChild);
    });

    it('should support a custom class name on the popover content', () => {
      render(
        <PopoverContent className="test" data-testid="test">
          test
        </PopoverContent>
      );
      // NOTE: the popover should render popover-content as the first child and
      // popover-caret as the second child
      expect(screen.getByTestId('test').firstChild).toHaveClass('test');
    });

    it('should have default caret height', async () => {
      render(
        <Popover
          open
          align="bottom"
          data-testid="test"
          autoAlign
          className="test ai-label">
          <button type="button">Settings</button>
          <PopoverContent className="test"></PopoverContent>
        </Popover>
      );

      await waitForPosition();
      const caretContainer =
        screen.getByTestId('test').lastChild.lastChild.firstChild;
      expect(caretContainer).toHaveStyle({ left: '0px', top: '-6px' });
    });

    it('should change caret height in case of ai-label', async () => {
      render(
        <Popover
          open
          align="bottom"
          data-testid="test"
          autoAlign
          className="test ai-label">
          <button type="button">Settings</button>
          <PopoverContent className="test ai-label"></PopoverContent>
        </Popover>
      );

      await waitForPosition();
      const caretContainer =
        screen.getByTestId('test').lastChild.lastChild.firstChild;
      expect(caretContainer).toHaveStyle({ left: '0px', top: '-7px' });
    });

    it('should forward additional props on the outermost element', () => {
      const { container } = render(
        <PopoverContent id="test" data-testid="test">
          test
        </PopoverContent>
      );
      expect(container.firstChild).toHaveAttribute('id', 'test');
    });

    // Tab Tip tests
    it('should respect isTabTip prop', () => {
      const { container } = render(
        <Popover open isTabTip>
          <button type="button">Settings</button>
          <PopoverContent>test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).toHaveClass(`${prefix}--popover--tab-tip`);
    });

    it('should not allow other alignments than bottom-start or bottom-end when isTabTip is present', () => {
      const { container } = render(
        <Popover open isTabTip align="top-start">
          <button type="button">Settings</button>
          <PopoverContent data-testid="test">test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--top-start`
      );
      expect(container.firstChild).toHaveClass(
        `${prefix}--popover--bottom-start`
      );
    });

    it('should shim legacy align prop top-left to top-start', () => {
      const { container } = render(
        <Popover open align="top-left">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--top-left`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--popover--top-start`);
    });

    it('should shim legacy align prop top-right to top-end', () => {
      const { container } = render(
        <Popover open align="top-right">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--top-right`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--popover--top-end`);
    });

    it('should shim legacy align prop bottom-left to bottom-start', () => {
      const { container } = render(
        <Popover open align="bottom-left">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--bottom-left`
      );
      expect(container.firstChild).toHaveClass(
        `${prefix}--popover--bottom-start`
      );
    });

    it('should shim legacy align prop bottom-right to bottom-end', () => {
      const { container } = render(
        <Popover open align="bottom-right">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--bottom-right`
      );
      expect(container.firstChild).toHaveClass(
        `${prefix}--popover--bottom-end`
      );
    });

    it('should shim legacy align prop left-bottom to left-end', () => {
      const { container } = render(
        <Popover open align="left-bottom">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--left-bottom`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--popover--left-end`);
    });

    it('should shim legacy align prop left-top to left-start', () => {
      const { container } = render(
        <Popover open align="left-top">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--left-top`
      );
      expect(container.firstChild).toHaveClass(
        `${prefix}--popover--left-start`
      );
    });

    it('should shim legacy align prop right-bottom to right-end', () => {
      const { container } = render(
        <Popover open align="right-bottom">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--right-bottom`
      );
      expect(container.firstChild).toHaveClass(`${prefix}--popover--right-end`);
    });

    it('should shim legacy align prop right-top to right-start', () => {
      const { container } = render(
        <Popover open align="right-top">
          <button type="button">Settings</button>
          <PopoverContent>Test</PopoverContent>
        </Popover>
      );
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--popover--right-top`
      );
      expect(container.firstChild).toHaveClass(
        `${prefix}--popover--right-start`
      );
    });

    it('should call onRequestClose when click happens outside the popover', async () => {
      const onRequestClose = jest.fn();
      const { container } = render(
        <Popover open onRequestClose={() => onRequestClose()}>
          <button type="button">Settings</button>
          <PopoverContent>test</PopoverContent>
        </Popover>
      );
      await userEvent.click(container);
      expect(onRequestClose).toHaveBeenCalled();
    });

    it('should add multi-line class to popover content when text is long', async () => {
      const { container } = await render(
        <Popover open>
          <button type="button">Settings</button>
          <PopoverContent>
            This is a very long text that should trigger the multi-line. Adding
            more text to make it even longer.
          </PopoverContent>
        </Popover>
      );
      waitFor(() =>
        expect(container.firstChild.lastChild.firstChild).toHaveClass(
          `${prefix}--popover-content--multi-line`
        )
      );
    });
    it('should not add multi-line class to popover content when text is short', () => {
      const { container } = render(
        <Popover open>
          <button type="button">Settings</button>
          <PopoverContent className="test">Short text</PopoverContent>
        </Popover>
      );
      expect(container.firstChild.lastChild.firstChild).not.toHaveClass(
        `${prefix}--popover-content--multi-line`
      );
    });

    it('should call onRequestClose when tabbing out of popover via keyboard', async () => {
      const onRequestClose = jest.fn();
      render(
        <Popover open onRequestClose={() => onRequestClose()}>
          <button type="button">Settings</button>
          <PopoverContent>test</PopoverContent>
        </Popover>
      );
      await userEvent.tab();
      await userEvent.tab();
      expect(onRequestClose).toHaveBeenCalled();
    });
  });

  it('should NOT call onRequestClose when clicking inside the popover content', async () => {
    const onRequestClose = jest.fn();
    render(
      <Popover open onRequestClose={onRequestClose}>
        <button type="button">Settings</button>
        <PopoverContent data-testid="popover-content">
          <button data-testid="inside-button">Inside Button</button>
          <input data-testid="inside-input" placeholder="Inside Input" />
        </PopoverContent>
      </Popover>
    );

    // Click on button inside popover - should NOT close
    await userEvent.click(screen.getByTestId('inside-button'));
    expect(onRequestClose).not.toHaveBeenCalled();

    // Click on input inside popover - should NOT close
    await userEvent.click(screen.getByTestId('inside-input'));
    expect(onRequestClose).not.toHaveBeenCalled();
  });
});
