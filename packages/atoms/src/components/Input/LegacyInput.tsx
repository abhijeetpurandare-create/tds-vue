import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
} from 'react'
import { css } from '@emotion/css'
import { useTheme } from '../ThemeProvider'
import { defaultThemeConfig } from '../../config/config'
import { countries } from '../../utils/CountryCodes'
import type { InputProps } from './index'

const LegacyInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className = '',
      size = 'md',
      variant = 'outlined',
      status = 'default',
      addonBefore,
      addonAfter,
      disabled = false,
      multiline = false,
      allowClear = false,
      showCount = false,
      count,
      label,
      helperText,
      prefixIcon,
      suffixIcon,
      isMobileNumberField = false,
      mobileFieldDetails = {
        countryCode: '+91',
        handleCountryChange: () => {},
        showFlag: false,
      },
      isPassword = false,
      value: controlledValue,
      onChange,
      onClear,
      onPressEnter,
      classNames = {},
      styles = {},
      ...rest
    },
    ref
  ) => {
    const { theme } = useTheme()
    const inputTheme =
      theme.components?.input || defaultThemeConfig.components.input

    const base = inputTheme.base
    const variantStyle = inputTheme.variants[variant]
    const sizeStyle = inputTheme.sizes[size]
    const stateStyle = status ? inputTheme.states[status] : null

    const [uncontrolledValue, setUncontrolledValue] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState(() => {
      const countryCode =
        mobileFieldDetails?.countryCode?.replace('+', '') || '91'
      return (
        countries.find((c) => c.code === `+${countryCode}`) ||
        countries.find((c) => c.iso === 'IN') ||
        countries[0]
      )
    })
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const searchInputRef = useRef<HTMLInputElement | null>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setDropdownOpen(false)
        }
      }

      if (dropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        // Focus on the search input when the dropdown opens
      } else {
        document.removeEventListener('mousedown', handleClickOutside)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [dropdownOpen])

    const filteredCountries = useMemo(() => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      return countries.filter(
        (country) =>
          country.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          country.code.includes(lowerCaseSearchTerm)
      )
    }, [searchTerm])

    // Handle country selection
    const handleCountrySelect = (country: any) => {
      setSelectedCountry(country)
      mobileFieldDetails?.handleCountryChange?.(country)
      setDropdownOpen(false)
    }

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (!isControlled) setUncontrolledValue(e.target.value)
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) setUncontrolledValue('')
      onClear?.()
    }

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (e.key === 'Enter') onPressEnter?.(e)
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const hasWidthClass = className.includes('w-')
    const tailwindClasses = [
      'flex items-center transition-all focus-within:outline-none placeholder-gray-400 min-w-0',
      hasWidthClass ? className : 'w-full',
      disabled ? 'cursor-not-allowed opacity-60' : '',
      addonBefore || isMobileNumberField ? '!py-0' : '',
      !hasWidthClass ? className : '',
    ]
      .filter(Boolean)
      .join(' ')

    const wrapperStateStyles = css({
      backgroundColor: variantStyle.backgroundColor,
      color: variantStyle.textColor,
      border: `1px solid ${variantStyle.borderColor}`,
      borderRadius: base?.radius?.default || '0.5rem',
      boxShadow: variantStyle.shadow || 'none',

      // Only apply default focus-within styles if no custom focus classes are provided
      '&:focus-within': {
        outline: base.focus.outline,
        borderColor: variantStyle.focusBorderColor,
      },

      ...(stateStyle && {
        borderColor: stateStyle.borderColor,
        backgroundColor: stateStyle.backgroundColor,
        color: stateStyle.textColor,
        boxShadow: stateStyle.shadow || variantStyle.shadow,
      }),
      ...styles.wrapper,
    })

    const textStateStyles = css({
      color: `${stateStyle?.textColor || variantStyle.textColor} !important`,
      '& svg': {
        color: 'inherit',
        stroke: 'currentColor',
        fill: 'currentColor',
      },
    })

    const helperTextStyle = css({
      fontWeight: theme.components?.input?.helperText?.fontWeight,
      fontSize: theme.components?.input?.helperText?.fontSize,
      ...styles.helperText,
    })

    // Use theme token for primary text color (avoid hardcoding hex)
    const countryCodeTextStyle = css({
      color:
        (theme.components?.toast as any)?.variants?.default?.textColor ||
        (defaultThemeConfig.components.toast as any).variants.default.textColor,
    })

    const inputFieldStyles = css({
      flex: 1,
      minWidth: 0,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      fontFamily: base.fontFamily,
      fontWeight: base.fontWeight,
      fontSize: sizeStyle.fontSize,
      height: sizeStyle.height,
      padding: '8px 0px',
      paddingLeft: addonBefore || isMobileNumberField ? '8px' : '12px',
      ...styles.input,
    })

    const labelStyle = css({
      color: theme.components?.input?.label?.color,
      fontWeight: theme.components?.input?.label?.fontWeight,
      fontSize: theme.components?.input?.label?.fontSize,
      ...styles.label,
    })

    const addOnBeforeStyle = css({
      paddingLeft: '12px',
      background:
        theme.components?.input?.addOnBefore?.backgroundColor || '#FAF7F7',
      padding: theme.components?.input?.addOnBefore?.padding || '8px 12px',
      borderTopLeftRadius:
        theme.components?.input?.addOnBefore?.borderTopLeftRadius || '8px',
      borderBottomLeftRadius:
        theme.components?.input?.addOnBefore?.borderBottomLeftRadius || '8px',
      height: theme.components?.input?.addOnBefore?.height || '100%',
      display: theme.components?.input?.addOnBefore?.display || 'flex',
      alignItems: theme.components?.input?.addOnBefore?.alignItems || 'center',
      justifyContent:
        theme.components?.input?.addOnBefore?.justifyContent || 'center',
      ...styles.addonBefore,
    })

    const addOnAfterStyle = css({
      paddingRight: '12px',
      background:
        theme.components?.input?.addOnAfter?.backgroundColor || '#FAF7F7',
      padding: theme.components?.input?.addOnAfter?.padding || '8px 12px',
      borderTopRightRadius:
        theme.components?.input?.addOnAfter?.borderTopRightRadius || '8px',
      borderBottomRightRadius:
        theme.components?.input?.addOnAfter?.borderBottomRightRadius || '8px',
      height: theme.components?.input?.addOnAfter?.height || '100%',
      display: theme.components?.input?.addOnAfter?.display || 'flex',
      alignItems: theme.components?.input?.addOnAfter?.alignItems || 'center',
      justifyContent:
        theme.components?.input?.addOnAfter?.justifyContent || 'center',
      ...styles.addonAfter,
    })

    // Prepare addonBefore content for mobile number field
    const mobileAddonBefore = isMobileNumberField ? (
      <div className='flex items-center'>
        {mobileFieldDetails?.showFlag && (
          <span className='text-xl mr-2'>{selectedCountry.flag}</span>
        )}
        <span
          className={`font-medium text-sm sm:text-base ${countryCodeTextStyle}`}
        >
          {selectedCountry.code}
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='ml-1'
        >
          <polyline points='6 9 12 15 18 9' />
        </svg>
      </div>
    ) : null

    return (
      <div
        className={`flex flex-col w-full ${classNames.container || ''}`}
        style={styles.container}
      >
        {label && (
          <label className={`mb-1 ${labelStyle} ${classNames.label || ''}`}>
            {label} {rest.required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div
          className={`flex relative ${
            className.includes('w-') ? '' : 'w-full'
          }`}
        >
          {/* Button removed: using addonBefore area for mobile country selector */}
          {/* Country Dropdown List */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className='absolute z-10 top-2 left-0 mt-1 w-full max-w-xs md:max-w-md bg-white border border-gray-200 rounded-lg shadow-xl
                          max-h-60 overflow-y-auto overflow-x-hidden transform scale-y-100 origin-top animate-fade-in-up'
              style={{
                // Ensure dropdown appears over the input if not enough space below
                top: 'calc(100% + 8px)',
                width: 'calc(100% + 2px)', // Adjust width to match parent + border
                left: '-1px', // Align with parent border
              }}
            >
              {/* Search Input within Dropdown */}
              <div className='sticky top-0 bg-white p-3 border-b border-gray-200 flex items-center space-x-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#6B7280'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-gray-500 flex-shrink-0'
                >
                  <circle cx='11' cy='11' r='8' />
                  <path d='m21 21-4.3-4.3' />
                </svg>

                <input
                  ref={searchInputRef}
                  type='text'
                  className='flex-1 p-2 text-gray-900 placeholder-gray-400 focus:outline-none rounded-md'
                  placeholder='Search country or code...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label='Search country'
                />
              </div>
              {/* List of Filtered Countries */}
              {filteredCountries.length > 0 ? (
                <ul>
                  {filteredCountries.map((country) => (
                    <li
                      key={country.iso}
                      className='flex items-center p-3 hover:bg-blue-50 cursor-pointer transition-colors'
                      onClick={() => handleCountrySelect(country)}
                    >
                      <span className='text-xl mr-3'>{country.flag}</span>
                      <span className='text-gray-800 font-medium mr-3 text-sm'>
                        {country.code}
                      </span>
                      <span className='flex-1 text-gray-500'>
                        {country.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='p-4 text-center text-gray-500'>
                  No countries found.
                </div>
              )}
            </div>
          )}
          <section
            className={`${tailwindClasses} ${wrapperStateStyles} ${
              classNames.wrapper || ''
            }`}
          >
            {(addonBefore || isMobileNumberField) && (
              <>
                <span
                  className={`py-2 pl-3 pr-2 bg-[#FAF7F7] rounded-l-lg h-full ${addOnBeforeStyle} ${
                    classNames.addonBefore || ''
                  }`}
                  style={styles.addonBefore}
                  onClick={
                    isMobileNumberField
                      ? () => setDropdownOpen((prev) => !prev)
                      : undefined
                  }
                  onKeyDown={
                    isMobileNumberField
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setDropdownOpen((prev) => !prev)
                          }
                        }
                      : undefined
                  }
                  role={isMobileNumberField ? 'button' : undefined}
                  aria-haspopup={isMobileNumberField ? 'true' : undefined}
                  aria-expanded={isMobileNumberField ? dropdownOpen : undefined}
                  tabIndex={isMobileNumberField ? 0 : undefined}
                >
                  {isMobileNumberField ? mobileAddonBefore : addonBefore}
                </span>
              </>
            )}
            {prefixIcon && (
              <span
                className={`mr-2 ${classNames.prefixIcon || ''}`}
                style={styles.prefixIcon}
              >
                {prefixIcon}
              </span>
            )}
            {multiline ? (
              <textarea
                ref={ref as React.Ref<HTMLTextAreaElement>}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={rest.placeholder}
                disabled={disabled}
                className={`${inputFieldStyles} ${classNames.input || ''}`}
                {...rest}
              />
            ) : (
              <input
                ref={ref as React.Ref<HTMLInputElement>}
                type={isPassword && !showPassword ? 'password' : 'text'}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={rest.placeholder}
                disabled={disabled}
                className={`${inputFieldStyles} ${classNames.input || ''}`}
                {...rest}
              />
            )}
            {allowClear && value && (
              <button
                type='button'
                onClick={handleClear}
                className='ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600'
              >
                ×
              </button>
            )}

            {isPassword && ['error'].includes(status) && (
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className={`ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none ${textStateStyles}`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  {showPassword ? (
                    <>
                      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                      <circle cx='12' cy='12' r='3' />
                    </>
                  ) : (
                    <>
                      <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                      <line x1='1' y1='1' x2='23' y2='23' />
                    </>
                  )}
                </svg>
              </button>
            )}
            {suffixIcon && (
              <div
                className={`ml-2 flex-shrink-0 ${textStateStyles} mr-3 ${
                  classNames.suffixIcon || ''
                }`}
                style={styles.suffixIcon}
              >
                {suffixIcon}
              </div>
            )}
            {addonAfter && (
              <div
                className={`border-l rounded-lg border-gray-300 ${addOnAfterStyle} ${
                  classNames.addonAfter || ''
                }`}
                style={styles.addonAfter}
              >
                <span className='text-inherit'>{addonAfter}</span>
              </div>
            )}
          </section>
        </div>
        {showCount && count !== undefined && (
          <p className='text-right mt-1 text-xs text-gray-500'>
            {String(value).length}/{count}
          </p>
        )}
        {helperText && (
          <div
            className={`mt-1 ${helperTextStyle} ${textStateStyles} ${
              classNames.helperText || ''
            }`}
          >
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

LegacyInput.displayName = 'LegacyInput'
export default LegacyInput
