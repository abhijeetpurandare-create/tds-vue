import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Radio, { RadioGroup } from '../index'

const tarmacConfig = {
  base: {
    transition: 'all 0.15s ease-in-out',
    borderWidth: '1px',
    focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.4)' },
    label: { fontFamily: 'Noto Sans, sans-serif', color: '#2b2b2b' },
    subtext: { fontFamily: 'Noto Sans, sans-serif', color: '#454545' },
  },
  variants: {
    standard: {
      borderColor: '#e6e6e6',
      hoverBorderColor: '#cccccc',
      checkedBackgroundColor: '#000000',
      checkedBorderColor: '#000000',
      checkedHoverBackgroundColor: '#0d0d0d',
      checkedHoverBorderColor: '#0d0d0d',
      dotColor: '#ffffff',
      focusRingColor: 'rgba(0,0,0,0.4)',
    },
    blue: {
      borderColor: '#91cafd',
      hoverBorderColor: '#48a7fc',
      checkedBackgroundColor: '#2396fb',
      checkedBorderColor: '#2396fb',
      checkedHoverBackgroundColor: '#1a7ad4',
      checkedHoverBorderColor: '#1a7ad4',
      dotColor: '#ffffff',
      focusRingColor: 'rgba(35,150,251,0.4)',
    },
    green: {
      borderColor: '#8dd3b6',
      hoverBorderColor: '#41b686',
      checkedBackgroundColor: '#1ba86e',
      checkedBorderColor: '#1ba86e',
      dotColor: '#ffffff',
      focusRingColor: 'rgba(27,168,110,0.4)',
    },
    dlv_red: {
      borderColor: '#ed899d',
      hoverBorderColor: '#e23b5d',
      checkedBackgroundColor: '#ed1b36',
      checkedBorderColor: '#ed1b36',
      dotColor: '#ffffff',
      focusRingColor: 'rgba(237,27,54,0.4)',
    },
  },
  styles: {
    filled: {
      standard: { borderColor: '#e6e6e6', checkedBackgroundColor: '#000000', dotColor: '#ffffff' },
      blue: { borderColor: '#91cafd', checkedBackgroundColor: '#2396fb', dotColor: '#ffffff' },
    },
    outlined: {
      standard: { borderColor: '#e6e6e6', checkedBackgroundColor: '#ffffff', dotColor: '#000000', checkedBorderColor: '#1a1a1a' },
      blue: { borderColor: '#91cafd', checkedBackgroundColor: '#f0f8ff', dotColor: '#2396fb', checkedBorderColor: '#48a7fc' },
    },
  },
  sizes: {
    lg: { radioSize: '24px', dotSize: '10px', borderWidth: '1px', labelFontSize: '16px', labelLineHeight: '24px', subtextFontSize: '14px', subtextLineHeight: '20px', gap: '8px' },
    md: { radioSize: '20px', dotSize: '8px', borderWidth: '1px', labelFontSize: '14px', labelLineHeight: '20px', subtextFontSize: '12px', subtextLineHeight: '16px', gap: '6px' },
    sm: { radioSize: '16px', dotSize: '6px', borderWidth: '1px', labelFontSize: '12px', labelLineHeight: '16px', subtextFontSize: '10px', subtextLineHeight: '12px', gap: '4px' },
  },
  states: {
    disabled: { borderColor: '#ededed', backgroundColor: 'transparent', dotColor: '#cdcbcb', labelColor: '#cdcbcb', subtextColor: '#cdcbcb' },
  },
}

jest.mock('../../ThemeProvider', () => ({
  useTheme: () => ({
    theme: { components: { radio_tarmac: tarmacConfig, radio: { base: { wrapper: { className: 'flex items-center cursor-pointer select-none relative flex-row gap-2' }, input: { style: {} }, icon: { size: '1rem', borderColor: '#D1D5DB', backgroundColor: 'transparent' }, label: { color: '#374151', style: {} }, transition: 'all 0.2s ease-in-out', focus: { outline: 'none', ring: '0 0 0 2px rgba(0,0,0,0.2)' } }, sizes: { sm: { wrapper: { className: '' }, icon: { size: '0.875rem' }, label: {} }, md: { wrapper: { className: '' }, icon: { size: '1rem' }, label: {} }, lg: { wrapper: { className: '' }, icon: { size: '1.25rem' }, label: {} } }, states: { checked: { icon: { borderColor: '#000', backgroundColor: '#000', dotColor: '#fff' } }, disabled: { wrapper: { className: 'cursor-not-allowed opacity-60', style: {} }, icon: { opacity: 0.6 }, label: { color: '#9CA3AF' } } }, group: { base: { className: 'flex items-center', style: {} }, vertical: { className: 'flex-col' }, horizontal: { className: 'flex-row' }, block: { className: 'w-full' }, sizes: { sm: { className: 'gap-2' }, md: { className: 'gap-2' }, lg: { className: 'gap-4' } } } } } },
  }),
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Radio — Legacy (backward compatibility)', () => {
  it('renders with children', () => {
    render(<Radio>Option A</Radio>)
    expect(screen.getByText('Option A')).toBeTruthy()
  })

  it('renders without children (standalone)', () => {
    const { container } = render(<Radio />)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('renders correct HTML element (label wraps input)', () => {
    const { container } = render(<Radio>Test</Radio>)
    const label = container.querySelector('label')
    expect(label).toBeTruthy()
    expect(label?.querySelector('input[type="radio"]')).toBeTruthy()
  })

  it('renders size sm without error', () => {
    const { container } = render(<Radio size="sm">Small</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('renders size md without error', () => {
    const { container } = render(<Radio size="md">Medium</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('renders size lg without error', () => {
    const { container } = render(<Radio size="lg">Large</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('controlled checked state', () => {
    const { container } = render(<Radio checked={true} value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  it('toggling controlled state on rerender', () => {
    const { container, rerender } = render(<Radio checked={false} value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(false)
    rerender(<Radio checked={true} value="a">A</Radio>)
    expect(input.checked).toBe(true)
  })

  it('uncontrolled with defaultChecked', () => {
    const { container } = render(<Radio defaultChecked value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  it('disabled state — native input is disabled', () => {
    const { container } = render(<Radio disabled value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('disabled state — aria-disabled is set', () => {
    const { container } = render(<Radio disabled value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.getAttribute('aria-disabled')).toBe('true')
  })

  it('onChange fires with correct event shape', () => {
    const handleChange = jest.fn()
    const { container } = render(<Radio onChange={handleChange} value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.click(input)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange.mock.calls[0][0].target.value).toBe('a')
  })

  it('onChange does NOT fire when disabled', () => {
    const handleChange = jest.fn()
    const { container } = render(<Radio onChange={handleChange} disabled value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.click(input)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('onClick fires', () => {
    const handleClick = jest.fn()
    render(<Radio onClick={handleClick} value="a">A</Radio>)
    fireEvent.click(screen.getByText('A'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('className prop is applied', () => {
    const { container } = render(<Radio className="custom-class" value="a">A</Radio>)
    expect(container.querySelector('.custom-class')).toBeTruthy()
  })

  it('id prop reaches the input', () => {
    const { container } = render(<Radio id="radio-id" value="a">A</Radio>)
    expect(container.querySelector('#radio-id')).toBeTruthy()
  })

  it('name prop reaches the input', () => {
    const { container } = render(<Radio name="radio-name" value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.name).toBe('radio-name')
  })

  it('value prop reaches the input', () => {
    const { container } = render(<Radio value="test-val">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('test-val')
  })

  it('tabIndex prop reaches the input', () => {
    const { container } = render(<Radio tabIndex={5} value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.tabIndex).toBe(5)
  })

  it('required prop reaches the input', () => {
    const { container } = render(<Radio required value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.required).toBe(true)
  })

  it('title prop reaches the wrapper', () => {
    const { container } = render(<Radio title="my-title" value="a">A</Radio>)
    expect(container.querySelector('[title="my-title"]')).toBeTruthy()
  })

  it('new Tarmac-only props are ignored when variant is not set', () => {
    const { container } = render(<Radio subtext="sub" value="a">A</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
    // subtext should not render in legacy path
    expect(screen.queryByText('sub')).toBeNull()
  })

  it('renders via legacy path when variant is absent', () => {
    const { container } = render(<Radio value="a">A</Radio>)
    const label = container.querySelector('label')
    expect(label).toBeTruthy()
  })
})

describe('Radio — Tarmac TDS', () => {
  it('renders when variant is set', () => {
    const { container } = render(<Radio variant="standard" value="a">A</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('renders without label/children (radio-only)', () => {
    const { container } = render(<Radio variant="standard" value="a" />)
    expect(container.querySelector('input[type="radio"]')).toBeTruthy()
  })

  it('correct DOM structure in Tarmac path', () => {
    const { container } = render(<Radio variant="standard" value="a">Label</Radio>)
    const label = container.querySelector('label')
    expect(label).toBeTruthy()
    expect(label?.querySelector('input[type="radio"]')).toBeTruthy()
    expect(screen.getByText('Label')).toBeTruthy()
  })

  it('standard variant renders', () => {
    const { container } = render(<Radio variant="standard" value="a">Standard</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('blue variant renders', () => {
    const { container } = render(<Radio variant="blue" value="a">Blue</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('green variant renders', () => {
    const { container } = render(<Radio variant="green" value="a">Green</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('dlv_red variant renders', () => {
    const { container } = render(<Radio variant="dlv_red" value="a">DLV Red</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('size sm renders', () => {
    const { container } = render(<Radio variant="standard" size="sm" value="a">Sm</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('size md renders', () => {
    const { container } = render(<Radio variant="standard" size="md" value="a">Md</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('size lg renders', () => {
    const { container } = render(<Radio variant="standard" size="lg" value="a">Lg</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('filled style renders', () => {
    const { container } = render(<Radio variant="standard" radioStyle="filled" value="a">Filled</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('outlined style renders', () => {
    const { container } = render(<Radio variant="standard" radioStyle="outlined" value="a">Outlined</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('default style when prop is omitted', () => {
    const { container } = render(<Radio variant="standard" value="a">Default</Radio>)
    expect(container.querySelector('label')).toBeTruthy()
  })

  it('all variant × style × size combinations render without error', () => {
    const variants: Array<'standard' | 'blue' | 'green' | 'dlv_red'> = ['standard', 'blue', 'green', 'dlv_red']
    const styles: Array<'filled' | 'outlined'> = ['filled', 'outlined']
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg']
    variants.forEach((v) => {
      styles.forEach((s) => {
        sizes.forEach((sz) => {
          const { container } = render(
            <Radio variant={v} radioStyle={s} size={sz} value="a">
              {v}-{s}-{sz}
            </Radio>
          )
          expect(container.querySelector('label')).toBeTruthy()
        })
      })
    })
  })

  it('checked state — input reflects it', () => {
    const { container } = render(<Radio variant="standard" checked value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  it('unchecked state', () => {
    const { container } = render(<Radio variant="standard" checked={false} value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.checked).toBe(false)
  })

  it('aria-checked true for checked', () => {
    const { container } = render(<Radio variant="standard" checked value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.getAttribute('aria-checked')).toBe('true')
  })

  it('disabled — native input disabled', () => {
    const { container } = render(<Radio variant="standard" disabled value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
  })

  it('disabled — aria-disabled true', () => {
    const { container } = render(<Radio variant="standard" disabled value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.getAttribute('aria-disabled')).toBe('true')
  })

  it('disabled + checked combo', () => {
    const { container } = render(<Radio variant="standard" disabled checked value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.disabled).toBe(true)
    expect(input.checked).toBe(true)
  })

  it('onChange fires when clicked', () => {
    const handleChange = jest.fn()
    const { container } = render(<Radio variant="standard" onChange={handleChange} value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.click(input)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('onChange does NOT fire when disabled', () => {
    const handleChange = jest.fn()
    const { container } = render(<Radio variant="standard" onChange={handleChange} disabled value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.click(input)
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('onClick fires', () => {
    const handleClick = jest.fn()
    render(<Radio variant="standard" onClick={handleClick} value="a">A</Radio>)
    fireEvent.click(screen.getByText('A'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('subtext renders when provided', () => {
    render(<Radio variant="standard" subtext="Supporting text" value="a">Label</Radio>)
    expect(screen.getByText('Supporting text')).toBeTruthy()
  })

  it('subtext renders without main label', () => {
    render(<Radio variant="standard" subtext="Only subtext" value="a" />)
    expect(screen.getByText('Only subtext')).toBeTruthy()
  })

  it('no subtext wrapper when neither children nor subtext', () => {
    const { container } = render(<Radio variant="standard" value="a" />)
    const spans = container.querySelectorAll('label > span')
    // Should only have the radio circle span, no text wrapper
    expect(spans.length).toBe(1)
  })

  it('className applied in Tarmac mode', () => {
    const { container } = render(<Radio variant="standard" className="tarmac-custom" value="a">A</Radio>)
    expect(container.querySelector('.tarmac-custom')).toBeTruthy()
  })

  it('id reaches input in Tarmac mode', () => {
    const { container } = render(<Radio variant="standard" id="tarmac-id" value="a">A</Radio>)
    expect(container.querySelector('#tarmac-id')).toBeTruthy()
  })

  it('name reaches input in Tarmac mode', () => {
    const { container } = render(<Radio variant="standard" name="tarmac-name" value="a">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.name).toBe('tarmac-name')
  })

  it('value reaches input in Tarmac mode', () => {
    const { container } = render(<Radio variant="standard" value="tarmac-val">A</Radio>)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('tarmac-val')
  })

  it('title reaches wrapper in Tarmac mode', () => {
    const { container } = render(<Radio variant="standard" title="tarmac-title" value="a">A</Radio>)
    expect(container.querySelector('[title="tarmac-title"]')).toBeTruthy()
  })
})

describe('RadioGroup', () => {
  it('renders string options', () => {
    render(<RadioGroup options={['A', 'B', 'C']} />)
    expect(screen.getByText('A')).toBeTruthy()
    expect(screen.getByText('B')).toBeTruthy()
    expect(screen.getByText('C')).toBeTruthy()
  })

  it('renders number options', () => {
    render(<RadioGroup options={[1, 2, 3]} />)
    expect(screen.getByText('1')).toBeTruthy()
    expect(screen.getByText('2')).toBeTruthy()
  })

  it('renders object options with label/value', () => {
    render(<RadioGroup options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }]} />)
    expect(screen.getByText('Option A')).toBeTruthy()
    expect(screen.getByText('Option B')).toBeTruthy()
  })

  it('onChange fires with selected value on check', () => {
    const handleChange = jest.fn()
    const { container } = render(<RadioGroup options={['A', 'B']} onChange={handleChange} />)
    const inputs = container.querySelectorAll('input[type="radio"]')
    fireEvent.click(inputs[0])
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('controlled value prop', () => {
    const { container } = render(<RadioGroup options={['A', 'B']} value="A" />)
    const inputs = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>
    expect(inputs[0].checked).toBe(true)
    expect(inputs[1].checked).toBe(false)
  })

  it('uncontrolled defaultValue prop', () => {
    const { container } = render(<RadioGroup options={['A', 'B']} defaultValue="B" />)
    const inputs = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>
    expect(inputs[0].checked).toBe(false)
    expect(inputs[1].checked).toBe(true)
  })

  it('group disabled blocks all children', () => {
    const { container } = render(<RadioGroup options={['A', 'B']} disabled />)
    const inputs = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>
    expect(inputs[0].disabled).toBe(true)
    expect(inputs[1].disabled).toBe(true)
  })

  it('individual option.disabled blocks that option only', () => {
    const { container } = render(
      <RadioGroup options={[{ label: 'A', value: 'a', disabled: true }, { label: 'B', value: 'b' }]} />
    )
    const inputs = container.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>
    expect(inputs[0].disabled).toBe(true)
    expect(inputs[1].disabled).toBe(false)
  })

  it('renders children instead of options', () => {
    render(
      <RadioGroup>
        <Radio value="x">Child X</Radio>
        <Radio value="y">Child Y</Radio>
      </RadioGroup>
    )
    expect(screen.getByText('Child X')).toBeTruthy()
    expect(screen.getByText('Child Y')).toBeTruthy()
  })

  it('className applied to group wrapper', () => {
    const { container } = render(<RadioGroup className="group-cls" options={['A']} />)
    expect(container.querySelector('.group-cls')).toBeTruthy()
  })

  it('role="radiogroup" present', () => {
    const { container } = render(<RadioGroup options={['A']} />)
    expect(container.querySelector('[role="radiogroup"]')).toBeTruthy()
  })

  it('aria-orientation horizontal by default', () => {
    const { container } = render(<RadioGroup options={['A']} />)
    expect(container.querySelector('[aria-orientation="horizontal"]')).toBeTruthy()
  })

  it('aria-orientation vertical when vertical=true', () => {
    const { container } = render(<RadioGroup options={['A']} vertical />)
    expect(container.querySelector('[aria-orientation="vertical"]')).toBeTruthy()
  })

  it('aria-orientation vertical when orientation="vertical"', () => {
    const { container } = render(<RadioGroup options={['A']} orientation="vertical" />)
    expect(container.querySelector('[aria-orientation="vertical"]')).toBeTruthy()
  })

  it('size prop passes to child components', () => {
    const { container } = render(<RadioGroup options={['A']} size="lg" />)
    expect(container.querySelector('[role="radiogroup"]')).toBeTruthy()
  })
})
