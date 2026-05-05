import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from '@/components/ThemeProvider'
import {
  Button,
  Spinner,
  FloatingButton,
  Card,
  Pill,
  Dropdown,
  Input,
  Alert,
  Table,
  OtpInput,
} from '@/index'
import '@/index.css'
import Map from '@/components/Map'
import MapPopup from '@/components/Map/MapPopup'
import type { MapGeofence } from '@/components/Map'
import 'maplibre-gl/dist/maplibre-gl.css'
import { loadTheme } from '@/utils/themeLoader'

// Icons for demonstration
const PlusIcon = (): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <line x1='12' y1='5' x2='12' y2='19'></line>
    <line x1='5' y1='12' x2='19' y2='12'></line>
  </svg>
)

const EditIcon = (): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
    <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
  </svg>
)

const ShareIcon = (): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='18' cy='5' r='3'></circle>
    <circle cx='6' cy='12' r='3'></circle>
    <circle cx='18' cy='19' r='3'></circle>
    <line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line>
    <line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line>
  </svg>
)

// Add Alert icons
const InfoIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='12' y1='16' x2='12' y2='12' />
    <line x1='12' y1='8' x2='12.01' y2='8' />
  </svg>
)

const WarningIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
    <line x1='12' y1='9' x2='12' y2='13' />
    <line x1='12' y1='17' x2='12.01' y2='17' />
  </svg>
)

const SuccessIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
    <polyline points='22 4 12 14.01 9 11.01' />
  </svg>
)

const ErrorIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='15' y1='9' x2='9' y2='15' />
    <line x1='9' y1='9' x2='15' y2='15' />
  </svg>
);

// NDR action & proof icons (Font Awesome)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateRight,
  faReply,
  faEllipsis,
  faComment,
  faPhone,
  faLocationDot,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

const NdrReattemptIcon = () => (
  <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4 text-white" />
);

const NdrReturnIcon = () => (
  <FontAwesomeIcon icon={faReply} className="w-4 h-4 text-text-heading" />
);

const NdrMoreIcon = () => (
  <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4 text-text-heading" />
);

const ndrProofIcons: Record<string, typeof faComment> = {
  whatsapp: faComment,
  call: faPhone,
  geofence: faLocationDot,
};

const ProofBadge = ({ label, type }: { label: string; type: string }) => (
  <Button
    variant="outline"
    size="sm"
    radius="14px"
    borderColor="#9d9d9d"
    textColor="#474747"
    backgroundColor="#fff"
    className="!h-7 !p-0 !pr-2 !gap-1 !justify-start !text-xs !font-medium !border-[0.5px] !overflow-hidden"
  >
    <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 !bg-proof-icon">
      <FontAwesomeIcon icon={ndrProofIcons[type] || faComment} className="w-3 h-3" />
    </span>
    <span className="text-xs font-medium leading-4 text-text-badge">{label}</span>
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3 text-text-badge" />
  </Button>
);

// Table examples
interface TableData {
  key: string
  name: string
  age: number
  address: string
}

// Define the Column type
interface Column<T> {
  title: string
  dataIndex?: string
  key: string
  sorter?: (a: T, b: T) => number
  render?: (text: any, record: T) => React.ReactNode
}

const tableColumns: Column<TableData>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: TableData, b: TableData) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: TableData, b: TableData) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'key',
    render: (_: any, record: TableData) => (
      <Button variant='outline' onClick={() => console.log(record)}>
        View
      </Button>
    ),
  },
]

const tableData: TableData[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]

// Simple Modal component to avoid type issues
const SimpleModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='absolute inset-0 bg-black bg-opacity-50'
        onClick={onClose}
      />
      <div className='relative bg-white rounded-lg shadow-xl p-6 max-w-xl w-full mx-4'>
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

// Dropdown options for examples
const dropdownOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4 (Disabled)', disabled: true },
  { value: '5', label: 'Option 5' },
]

// Long list of options for multi-select examples
const longDropdownOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `${i + 1}`,
  label: `Option ${i + 1}`,
}))

const App: React.FC = () => {
  // State for the FloatingButton examples
  const [isLoading, setIsLoading] = useState(false)
  // State for Modal examples
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalVariant, setModalVariant] = useState('default')
  const [modalSize, setModalSize] = useState('md')
  const [modalLoading, setModalLoading] = useState(false)
  // State for Dropdown examples
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(undefined)
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([])
  const [dropdownLoading, setDropdownLoading] = useState(false)
  const [multiSelectValues, setMultiSelectValues] = useState<
    (string | number)[]
  >(['1', '3'])
  const [longListValues, setLongListValues] = useState<(string | number)[]>([])
  const [pillVariantValues, setPillVariantValues] = useState<
    (string | number)[]
  >(['1', '2'])
  const [alertVisible, setAlertVisible] = useState({
    default: true,
    primary: true,
    destructive: true,
    success: true,
    warning: true,
    info: true,
  })
  // State for OtpInput examples
  const [otpDefault, setOtpDefault] = useState('')
  const [otpPrefilled, setOtpPrefilled] = useState('1234')
  const [otpNumeric, setOtpNumeric] = useState('')
  const [otpPassword, setOtpPassword] = useState('')
  const [otpFourDigit, setOtpFourDigit] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')
  const [otpWarning, setOtpWarning] = useState('')
  const [otpCompleted, setOtpCompleted] = useState('')
  const [otpCompletedMsg, setOtpCompletedMsg] = useState('')

  const toggleLoading = () => {
    setIsLoading((prev) => !prev)
  }

  const handleModalOpen = (variant = 'default', size = 'md') => {
    setModalVariant(variant)
    setModalSize(size)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setModalLoading(false)
  }

  const handleModalOk = () => {
    setModalLoading(true)
    // Simulate async operation
    setTimeout(() => {
      setModalLoading(false)
      setIsModalOpen(false)
    }, 2000)
  }

  const handleDropdownChange = (
    value: string | number | (string | number)[]
  ) => {
    if (Array.isArray(value)) {
      setSelectedValues(value)
      console.log('Selected values:', value)
    } else {
      setSelectedValue(value)
      console.log('Selected value:', value)
    }
  }

  const handleMultiSelectChange = (
    value: string | number | (string | number)[]
  ) => {
    if (Array.isArray(value)) {
      setMultiSelectValues(value)
      console.log('Multi-select values:', value)
    }
  }

  const handleLongListChange = (
    value: string | number | (string | number)[]
  ) => {
    if (Array.isArray(value)) {
      setLongListValues(value)
      console.log('Long list values:', value)
    }
  }

  const handlePillVariantChange = (
    value: string | number | (string | number)[]
  ) => {
    if (Array.isArray(value)) {
      setPillVariantValues(value)
      console.log('Pill variant values:', value)
    }
  }

  const toggleDropdownLoading = () => {
    setDropdownLoading((prev) => !prev)
  }

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ]

  const DEMO_STYLE = 'https://tiles.openfreemap.org/styles/bright'

  const geofenceMarkers = [
    {
      id: 'hub-blr',
      lat: 12.97,
      lng: 77.5946,
      tooltip: <MapPopup title="Bangalore Hub" status="Active" statusColor="#22C55E" />,
      marker: { color: "pink" }
    },
    {
      id: 'hub-blr1',
      lat: 12.9723,
      lng: 77.594,
      tooltip: <MapPopup title="Bangalore Hub 2" status="Active" statusColor="#22C55E" />,
      marker: { color: "blue" }
    }
  ]

  const testGeofences: MapGeofence[] = [
    {
      id: 'zone-blr',
      geometry: { type: 'Point' as const, coordinates: [77.5946, 12.9716] as [number, number] },
      radius: 500,
      shapeType: 'circle' as const,
      fillColor: 'gold',
      strokeColor: 'brown'
    }
  ]

  return (
    <div className='p-8 pb-48'>
      {/* Map Geofence Debug */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Map — Geofence Debug</h2>
        <Map
          height="500px"
          config={{
            mapStyle: DEMO_STYLE,
            initialViewState: { longitude: 78.96, latitude: 20.59, zoom: 4.5 },
          }}
          points={geofenceMarkers}
          geofences={testGeofences}
        > 
        </Map>
      </section>

      {/* Button Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Button Examples</h2>

        {/* Basic Variants */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Basic Variants</h3>
          <div className='flex gap-4 mb-4'>
            <Button variant='primary'>Primary Button</Button>
            <Button variant='secondary'>Secondary Button</Button>
            <Button variant='outline'>Outline Button</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Sizes</h3>
          <div className='flex items-center gap-4 mb-4'>
            <Button variant='secondary' size='sm'>
              Small Button
            </Button>
            <Button size='md'>Medium Button</Button>
            <Button size='lg'>Large Button</Button>
          </div>
        </div>

        {/* States */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>States</h3>
          <div className='flex gap-4 mb-4'>
            <Button isLoading>Loading Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </div>

        {/* Icons */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>With Icons</h3>
          <div className='flex gap-4 mb-4'>
            <Button icon={<PlusIcon />} iconPosition='left'>
              Left Icon
            </Button>
            <Button icon={<PlusIcon />} iconPosition='right'>
              Right Icon
            </Button>
          </div>
        </div>
      </section>

      {/* FloatingButton Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>FloatingButton Examples</h2>
        <p className='mb-4'>
          FloatingButton examples are rendered in the corners of the page.
        </p>

        <div className='flex flex-wrap gap-4 mb-4'>
          <Button onClick={toggleLoading}>Toggle Loading State</Button>
        </div>

        {/* Demo area with colored background to show floating buttons better */}
        <div className='relative h-96 bg-gray-100 rounded-lg p-4 mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Different Positions (in this container)
          </h3>

          {/* Different positions within the container */}
          <FloatingButton
            icon={<PlusIcon />}
            position='top-left'
            style={{ position: 'absolute', top: '1rem', left: '1rem' }}
          />

          <FloatingButton
            icon={<EditIcon />}
            position='top-right'
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            variant='secondary'
          />

          <FloatingButton
            icon={<ShareIcon />}
            position='bottom-left'
            style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}
            variant='outline'
            text='Ashwin'
          />

          <FloatingButton
            icon={<PlusIcon />}
            position='bottom-right'
            style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
            backgroundColor='#5b21b6'
          />
        </div>
      </section>

      {/* Modal Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Modal Examples</h2>
        <p className='mb-4'>
          Click the buttons below to open different modal variants.
        </p>

        <div className='flex flex-wrap gap-4 mb-8'>
          <Button onClick={() => handleModalOpen('default', 'md')}>
            Open Modal
          </Button>
        </div>

        {/* Using our simple modal implementation */}
        <SimpleModal isOpen={isModalOpen} onClose={handleModalClose}>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Modal Content</h2>
            <p className='mb-2'>
              This is a simplified modal implementation to avoid type errors.
            </p>
            <p className='mb-4'>
              It has all the basic functionality needed for demonstration.
            </p>

            <div className='flex justify-end gap-2 mt-8'>
              <Button variant='outline' onClick={handleModalClose}>
                Cancel
              </Button>
              <Button
                variant='primary'
                isLoading={modalLoading}
                onClick={() => {
                  setModalLoading(true)
                  setTimeout(() => {
                    setModalLoading(false)
                    setIsModalOpen(false)
                  }, 2000)
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </SimpleModal>
      </section>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Spinners</h2>
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Variants</h3>
            <div className='flex gap-4 items-center'>
              <Spinner variant='default' />
              <Spinner variant='primary' />
              <Spinner variant='secondary' />
              <Spinner variant='success' />
              <Spinner variant='error' />
              <Spinner variant='warning' />
              <Spinner variant='info' />
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Sizes</h3>
            <div className='flex gap-4 items-center'>
              <Spinner size='sm' />
              <Spinner size='md' />
              <Spinner size='lg' />
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Custom Styling</h3>
            <div className='flex gap-4 items-center'>
              <Spinner className='text-blue-500' />
              <Spinner style={{ opacity: 0.5 }} />
              <div className='p-4 bg-gray-100 rounded'>
                <Spinner variant='primary' size='lg' />
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Custom Colors</h3>
            <div className='flex gap-4 items-center'>
              <Spinner color='#FF5733' trackColor='#FFE5D9' size='md' />
              <Spinner color='#800080' trackColor='#F5E1FF' size='md' />
              <Spinner color='#006400' trackColor='#E0FFE0' size='md' />
              <Spinner color='#1E90FF' trackColor='#E6F2FF' size='md' />
            </div>
          </div>
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='text-2xl font-bold mb-4'>Cards</h2>
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Variants</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card variant='elevated' title='Elevated Card'>
                This is the default card variant with elevated style.
              </Card>
              <Card variant='outlined' title='Outlined Card'>
                This card has an outlined style with a border.
              </Card>
              <Card variant='flat' title='Flat Card'>
                This is a flat card with no shadow or border.
              </Card>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Sizes</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card size='sm' title='Small Card'>
                This is a small sized card.
              </Card>
              <Card size='md' title='Medium Card'>
                This is a medium sized card (default).
              </Card>
              <Card size='lg' title='Large Card'>
                This is a large sized card with more padding.
              </Card>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>With Extra Content</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Card
                title='Card Title'
                extra={
                  <a href='#' className='text-blue-500 hover:underline'>
                    More
                  </a>
                }
              >
                This card has extra content in the top-right corner.
              </Card>
              <Card
                title='With Cover Image'
                cover={
                  <img
                    src='https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&h=200'
                    alt='Card cover'
                    className='w-full h-40 object-cover'
                  />
                }
              >
                This card has a cover image at the top.
              </Card>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>With Actions</h3>
            <Card
              title='Card with Actions'
              actions={[
                <button key='1' className='text-blue-500 hover:underline'>
                  View
                </button>,
                <button key='2' className='text-blue-500 hover:underline'>
                  Edit
                </button>,
                <button key='3' className='text-red-500 hover:underline'>
                  Delete
                </button>,
              ]}
            >
              <p>This card has action buttons in the footer.</p>
            </Card>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Interactive Cards</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Card title='Loading Card' isLoading={true}>
                <p>This content is hidden while the card is loading.</p>
              </Card>
              <Card
                title='Hoverable Card'
                isHoverable={true}
                onClick={() => alert('Card clicked!')}
              >
                <p>
                  Hover over me and click! I have a hover effect and I'm
                  clickable.
                </p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>Custom Styling</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card
                title='Custom Colors'
                backgroundColor='#f0f9ff'
                borderColor='#bfdbfe'
              >
                This card has custom background and border colors.
              </Card>
              <Card title='Custom Shadow' shadow='shadow-xl' isRounded={true}>
                This card has a custom shadow and rounded corners.
              </Card>
              <Card
                title='Custom Dimensions'
                width='100%'
                height='200px'
                bodyStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p>This card has custom width, height, and body styling.</p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-2'>
              With Meta Information
            </h3>
            <Card>
              <Card.Meta
                avatar={
                  <div className='w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white'>
                    AP
                  </div>
                }
                title='Card Meta Title'
                description='This card uses the Card.Meta compound component to display avatar, title, and description.'
              />
            </Card>
          </div>
        </div>
      </div>

      {/* Pill Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Pill Examples</h2>

        {/* Basic Variants */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Basic Variants</h3>
          <div className='flex gap-4 mb-4'>
            <Pill variant='default'>Default Pill</Pill>
            <Pill variant='success'>Success Pill</Pill>
            <Pill variant='danger'>Danger Pill</Pill>
            <Pill variant='warning'>Warning Pill</Pill>
            <Pill variant='info'>Info Pill</Pill>
          </div>
        </div>

        {/* Sizes */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Sizes</h3>
          <div className='flex items-center gap-4 mb-4'>
            <Pill size='sm'>Small Pill</Pill>
            <Pill size='md'>Medium Pill</Pill>
            <Pill size='lg'>Large Pill</Pill>
          </div>
        </div>

        {/* Closable */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Closable Pills</h3>
          <div className='flex gap-4 mb-4'>
            <Pill closable>Closable Pill</Pill>
            <Pill closable variant='success'>
              Closable Success
            </Pill>
            <Pill closable variant='danger'>
              Closable Danger
            </Pill>
          </div>
        </div>

        {/* Clickable */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Clickable Pills</h3>
          <div className='flex gap-4 mb-4'>
            <Pill onClick={() => alert('Pill clicked')}>Click Me</Pill>
            <Pill onClick={() => alert('Success clicked')} variant='success'>
              Click Success
            </Pill>
          </div>
        </div>

        {/* Custom Styling */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Custom Styling</h3>
          <div className='flex gap-4 mb-4'>
            <Pill backgroundColor='#8B5CF6' color='white'>
              Custom Purple
            </Pill>
            <Pill
              backgroundColor='#FBBF24'
              color='#7C2D12'
              borderColor='#92400E'
            >
              Custom Yellow
            </Pill>
            <Pill style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              With Shadow
            </Pill>
          </div>
        </div>

        {/* With Icons */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Pills With Icons</h3>
          <div className='flex gap-4 mb-4'>
            <Pill icon={<PlusIcon />}>New Item</Pill>
            <Pill icon={<EditIcon />} variant='info'>
              Edit Item
            </Pill>
            <Pill icon={<ShareIcon />} variant='success'>
              Share
            </Pill>
          </div>
        </div>
      </section>

      {/* Dropdown Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Dropdown Examples</h2>

        {/* Basic Variants */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Basic Variants</h3>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Dropdown
              variant='primary'
              options={dropdownOptions}
              placeholder='Primary Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              variant='secondary'
              options={dropdownOptions}
              placeholder='Secondary Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              variant='outline'
              options={dropdownOptions}
              placeholder='Outline Dropdown'
              onChange={handleDropdownChange}
            />
          </div>
        </div>

        {/* Sizes */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Sizes</h3>
          <div className='flex flex-wrap items-center gap-4 mb-4'>
            <Dropdown
              size='sm'
              options={dropdownOptions}
              placeholder='Small Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              size='md'
              options={dropdownOptions}
              placeholder='Medium Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              size='lg'
              options={dropdownOptions}
              placeholder='Large Dropdown'
              onChange={handleDropdownChange}
            />
          </div>
        </div>

        {/* States */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>States</h3>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Dropdown
              isLoading={dropdownLoading}
              options={dropdownOptions}
              placeholder='Loading Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              disabled
              options={dropdownOptions}
              placeholder='Disabled Dropdown'
              onChange={handleDropdownChange}
            />
            <Button onClick={toggleDropdownLoading}>
              Toggle Loading State
            </Button>
          </div>
        </div>

        {/* With Icons */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>With Icons</h3>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Dropdown
              icon={<PlusIcon />}
              iconPosition='left'
              options={dropdownOptions}
              placeholder='Left Icon'
              onChange={handleDropdownChange}
            />
            <Dropdown
              icon={<PlusIcon />}
              iconPosition='right'
              options={dropdownOptions}
              placeholder='Right Icon'
              onChange={handleDropdownChange}
            />
          </div>
        </div>

        {/* Icon-only (More / ellipsis style) */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Icon-only Dropdown</h3>
          <p className='text-sm text-gray-600 mb-4'>
            Compact trigger showing only the icon (e.g. “More” ellipsis). No
            placeholder or selected value.
          </p>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Dropdown
              iconOnly
              icon={<NdrMoreIcon />}
              options={dropdownOptions}
              displayOnlyPlaceholder
              value={undefined}
              onChange={handleDropdownChange}
              className='!bg-[#1F222E] !text-white !border-0 rounded-lg'
            />
            <Dropdown
              iconOnly
              icon={<PlusIcon />}
              options={dropdownOptions}
              displayOnlyPlaceholder
              value={undefined}
              onChange={handleDropdownChange}
              variant='outline'
            />
          </div>
        </div>

        {/* Auto position (flips horizontally when near viewport edge) */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Auto-position Dropdown</h3>
          <p className='text-sm text-gray-600 mb-4'>
            position=&quot;auto&quot; opens to the right when at the left edge,
            and to the left when at the right edge, to avoid overflow.
          </p>
          <div className='flex justify-between w-full gap-4'>
            <div className='flex justify-start'>
              <Dropdown
                iconOnly
                icon={<NdrMoreIcon />}
                position='auto'
                options={dropdownOptions}
                displayOnlyPlaceholder
                value={undefined}
                onChange={handleDropdownChange}
                className='!p-0 !min-w-[2.375rem] !w-[2.375rem] !h-[2.375rem] !bg-[#1F222E] !border-0 rounded-lg'
              />
            </div>
            <div className='flex justify-end'>
              <Dropdown
                iconOnly
                icon={<NdrMoreIcon />}
                position='auto'
                options={dropdownOptions}
                displayOnlyPlaceholder
                value={undefined}
                onChange={handleDropdownChange}
                variant='outline'
                className='!p-0 !min-w-[2.375rem] !w-[2.375rem] !h-[2.375rem]'
              />
            </div>
          </div>
        </div>

        {/* Searchable */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Searchable Dropdown</h3>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Dropdown
              isSearchable
              options={dropdownOptions}
              placeholder='Search options...'
              onChange={handleDropdownChange}
            />
          </div>
        </div>

        {/* Full Width and Rounded */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Full Width and Rounded</h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              isFullWidth
              options={dropdownOptions}
              placeholder='Full Width Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              isRounded
              options={dropdownOptions}
              placeholder='Rounded Dropdown'
              onChange={handleDropdownChange}
            />
            <Dropdown
              isFullWidth
              isRounded
              options={dropdownOptions}
              placeholder='Full Width and Rounded'
              onChange={handleDropdownChange}
            />
          </div>
        </div>

        {/* Controlled Value */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Controlled Value</h3>
          <div className='flex flex-wrap gap-4 mb-4'>
            <Dropdown
              value={selectedValue}
              options={dropdownOptions}
              placeholder='Controlled Dropdown'
              onChange={handleDropdownChange}
            />
            <div className='text-sm text-gray-500'>
              Selected value: {selectedValue || 'None'}
            </div>
          </div>
        </div>

        {/* Multi-select */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Multi-select</h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={selectedValues}
              options={options}
              placeholder='Select multiple options'
              onChange={handleDropdownChange}
              isSearchable
              multiple
            />
            <div className='text-sm text-gray-500'>
              Selected values:{' '}
              {selectedValues.length > 0 ? selectedValues.join(', ') : 'None'}
            </div>
          </div>
        </div>

        {/* Multi-select with pre-selected values */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Multi-select with Pre-selected Values
          </h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={multiSelectValues}
              options={options}
              placeholder='Select multiple options'
              onChange={handleMultiSelectChange}
              multiple
            />
            <div className='text-sm text-gray-500'>
              Selected values:{' '}
              {multiSelectValues.length > 0
                ? multiSelectValues.join(', ')
                : 'None'}
            </div>
          </div>
        </div>

        {/* Multi-select with long option list */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Multi-select with Long Option List
          </h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={longListValues}
              options={longDropdownOptions}
              placeholder='Select from many options'
              onChange={handleLongListChange}
              multiple
              isSearchable
            />
            <div className='text-sm text-gray-500'>
              Selected values:{' '}
              {longListValues.length > 0 ? longListValues.join(', ') : 'None'}
            </div>
          </div>
        </div>

        {/* Multi-select with different pill variants */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Multi-select with Different Pill Variants
          </h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={pillVariantValues}
              options={options}
              placeholder='Success pills'
              onChange={handlePillVariantChange}
              multiple
              pillVariant='success'
            />
            <Dropdown
              value={pillVariantValues}
              options={options}
              placeholder='Warning pills'
              onChange={handlePillVariantChange}
              multiple
              pillVariant='warning'
            />
            <Dropdown
              value={pillVariantValues}
              options={options}
              placeholder='Danger pills'
              onChange={handlePillVariantChange}
              multiple
              pillVariant='danger'
            />
            <Dropdown
              value={pillVariantValues}
              options={options}
              placeholder='Info pills'
              onChange={handlePillVariantChange}
              multiple
              pillVariant='info'
            />
          </div>
        </div>

        {/* Multi-select with different states */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Multi-select with Different States
          </h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Disabled multi-select'
              multiple
              disabled
            />
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Loading multi-select'
              multiple
              isLoading
            />
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Error multi-select'
              multiple
              error='Error state example'
            />
          </div>
        </div>

        {/* Multi-select with different sizes */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Multi-select with Different Sizes
          </h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={['1']}
              options={options}
              placeholder='Small multi-select'
              multiple
              size='sm'
            />
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Medium multi-select'
              multiple
              size='md'
            />
            <Dropdown
              value={['1', '2', '3']}
              options={options}
              placeholder='Large multi-select'
              multiple
              size='lg'
            />
          </div>
        </div>

        {/* Multi-select with different variants */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>
            Multi-select with Different Variants
          </h3>
          <div className='flex flex-col gap-4 mb-4'>
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Primary multi-select'
              multiple
              variant='primary'
            />
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Secondary multi-select'
              multiple
              variant='secondary'
            />
            <Dropdown
              value={['1', '2']}
              options={options}
              placeholder='Outline multi-select'
              multiple
              variant='outline'
            />
          </div>
        </div>
      </section>

      {/* Input Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Input Examples</h2>
        <Input variant='outlined' placeholder='Outlined Input' />
        <Input variant='outlined' placeholder='Enter value' addonAfter='kg' />
        <Input
          variant='outlined'
          placeholder='Search...'
          suffixIcon={<span>🔍</span>}
          classNames={{ suffixIcon: 'mr-3' }}
        />
      </section>

      {/* Alert Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>Alert Examples</h2>

        {/* Basic Variants */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Basic Variants</h3>
          <div className='space-y-4'>
            {alertVisible.default && (
              <Alert
                variant='default'
                title='Default Alert'
                description='This is a default alert with a description.'
                closable
                onClose={() =>
                  setAlertVisible((prev) => ({ ...prev, default: false }))
                }
              />
            )}
            {alertVisible.primary && (
              <Alert
                variant='primary'
                icon={<InfoIcon />}
                title='Primary Alert'
                description='This is a primary alert with an icon and description.'
                closable
                onClose={() =>
                  setAlertVisible((prev) => ({ ...prev, primary: false }))
                }
              />
            )}
            {alertVisible.destructive && (
              <Alert
                variant='destructive'
                icon={<ErrorIcon />}
                title='Destructive Alert'
                description='This is a destructive alert for error states.'
                closable
                onClose={() =>
                  setAlertVisible((prev) => ({ ...prev, destructive: false }))
                }
              />
            )}
            {alertVisible.success && (
              <Alert
                variant='success'
                icon={<SuccessIcon />}
                title='Success Alert'
                description='This is a success alert for successful operations.'
                closable
                onClose={() =>
                  setAlertVisible((prev) => ({ ...prev, success: false }))
                }
              />
            )}
            {alertVisible.warning && (
              <Alert
                variant='warning'
                icon={<WarningIcon />}
                title='Warning Alert'
                description='This is a warning alert for cautionary messages.'
                closable
                onClose={() =>
                  setAlertVisible((prev) => ({ ...prev, warning: false }))
                }
              />
            )}
            {alertVisible.info && (
              <Alert
                variant='info'
                icon={<InfoIcon />}
                title='Info Alert'
                description='This is an info alert for informational messages.'
                closable
                onClose={() =>
                  setAlertVisible((prev) => ({ ...prev, info: false }))
                }
              />
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Sizes</h3>
          <div className='space-y-4'>
            <Alert
              size='sm'
              variant='primary'
              icon={<InfoIcon />}
              title='Small Alert'
              description='This is a small-sized alert.'
            />
            <Alert
              size='md'
              variant='primary'
              icon={<InfoIcon />}
              title='Medium Alert'
              description='This is a medium-sized alert.'
            />
            <Alert
              size='lg'
              variant='primary'
              icon={<InfoIcon />}
              title='Large Alert'
              description='This is a large-sized alert.'
            />
          </div>
        </div>

        {/* Without Icons */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Without Icons</h3>
          <div className='space-y-4'>
            <Alert
              variant='success'
              title='Success Without Icon'
              description='This is a success alert without an icon.'
            />
            <Alert
              variant='warning'
              title='Warning Without Icon'
              description='This is a warning alert without an icon.'
            />
          </div>
        </div>

        {/* Title Only */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Title Only</h3>
          <div className='space-y-4'>
            <Alert variant='info' title='Info Title Only' />
            <Alert variant='destructive' title='Error Title Only' />
          </div>
        </div>

        {/* Description Only */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Description Only</h3>
          <div className='space-y-4'>
            <Alert
              variant='primary'
              description='This is an alert with only a description.'
            />
            <Alert
              variant='success'
              description='Another alert with only a description.'
            />
          </div>
        </div>

        {/* Custom Styling */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Custom Styling</h3>
          <div className='space-y-4'>
            <Alert
              backgroundColor='#4338CA'
              textColor='#FFFFFF'
              borderColor='#3730A3'
              iconColor='#93C5FD'
              icon={<InfoIcon />}
              title='Custom Styled Alert'
              description='This alert uses custom colors for all elements.'
            />
            <Alert
              backgroundColor='#FEF2F2'
              textColor='#991B1B'
              borderColor='#FCA5A5'
              iconColor='#DC2626'
              icon={<ErrorIcon />}
              title='Custom Error Style'
              description='A custom styled error alert with specific colors.'
            />
          </div>
        </div>

        {/* With Children */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>With Children</h3>
          <div className='space-y-4'>
            <Alert variant='info' icon={<InfoIcon />}>
              This is an alert with children content instead of
              title/description
            </Alert>
            <Alert variant='warning' icon={<WarningIcon />}>
              <div className='flex items-center justify-between'>
                <span>Complex content with button</span>
                <Button size='sm' variant='outline'>
                  Action
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      </section>

      {/* OTP Input Examples */}
      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-4'>OTP Input Examples</h2>

        {/* Default */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Default (6 digits)</h3>
          <OtpInput
            value={otpDefault}
            onChange={setOtpDefault}
            label='Enter OTP'
            helperText={`Current value: "${otpDefault}"`}
          />
        </div>

        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Default (6 digits)</h3>
          <Input
            label='Enter OTP'
            helperText={`Current value: "${otpDefault}"`}
          />
        </div>

        {/* Pre-filled Value */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Pre-filled Value</h3>
          <OtpInput
            value={otpPrefilled}
            onChange={setOtpPrefilled}
            numDigits={4}
            label='Pre-filled OTP'
            helperText={`Value: "${otpPrefilled}"`}
          />
        </div>

        {/* Input Types */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-2'>Input Types</h3>
          <div className='space-y-6'>
            <OtpInput
              value={otpNumeric}
              onChange={setOtpNumeric}
              inputType='number'
              label='Numeric Only'
              helperText='Only accepts digits'
            />
            <OtpInput
              value={otpPassword}
              onChange={setOtpPassword}
              inputType='password'
              label='Password (masked)'
              helperText='Input is hidden like a password field'
            />
          </div>
        </div>
      </section>

      {/* Table with Row Footer Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Table with Row Footer</h2>

        <div className="bg-bg-surface p-4">
          <Table
            variant="card"
            columns={[
              {
                title: 'ORDER ID & AWB NO.',
                key: 'orderId',
                render: (_: unknown, record: any) => (
                  <div className="flex flex-col">
                    <span className="text-text-primary font-medium text-sm leading-5 cursor-pointer">
                      {record.orderId}
                    </span>
                    <span className="text-black text-sm leading-6">
                      {record.awbNo}
                    </span>
                  </div>
                ),
                width: 207,
              },
              {
                title: 'PRODUCT DETAILS',
                key: 'product',
                render: (_: unknown, record: any) => (
                  <div className="flex flex-col gap-0.5">
                    <div className="flex gap-1 items-center">
                      <span className="font-medium text-sm leading-5 text-text-heading">
                        {record.productName}
                      </span>
                      {record.extraItems > 0 && (
                        <span className="italic text-sm leading-5 text-text-muted">
                          (+{record.extraItems} items)
                        </span>
                      )}
                    </div>
                    <span className="text-sm leading-5 text-text-muted">
                      {record.price}
                    </span>
                  </div>
                ),
                width: 217,
              },
              {
                title: 'PAYMENT MODE',
                dataIndex: 'paymentMode',
                key: 'paymentMode',
                width: 173,
              },
              {
                title: 'NDR TYPE',
                dataIndex: 'ndrType',
                key: 'ndrType',
                width: 150,
              },
              {
                title: 'ATTEMPT COUNT',
                key: 'attemptCount',
                render: (_: unknown, record: any) => (
                  <span className="text-text-body text-sm leading-5">
                    {record.attemptCount} attempts
                  </span>
                ),
                width: 135,
              },
              {
                title: 'LAST UPDATED',
                dataIndex: 'lastUpdated',
                key: 'lastUpdated',
                width: 164,
              },
              {
                key: 'proofs',
                dataIndex: 'proofs',
                rowFooter: true,
                cardStyles: 'border-t border-dashed border-border-default px-4 py-3',
                render: (_value: unknown, record: any) => {
                  const hasProofs = record.proofs && record.proofs.length > 0;
                  const hasActions = record.actions && record.actions.length > 0;
                  if (!hasProofs && !hasActions) return null;
                  return (
                    <div className="flex items-center justify-between w-full">
                      {hasProofs ? (
                        <div className="flex items-center gap-4">
                          <span className="font-medium text-sm leading-5 text-text-heading">
                            Proofs
                          </span>
                          <div className="flex gap-2">
                            {record.proofs.map((proof: { label: string; type: string }) => (
                              <ProofBadge key={proof.type} label={proof.label} type={proof.type} />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                      {hasActions && (
                        <div className="flex gap-2 items-center">
                          {record.actions.map((action: any) =>
                            action.iconOnly ? (
                              <Button
                                key={action.type}
                                variant={action.variant || 'outline'}
                                size="sm"
                                className="!h-[38px] !w-[38px] !min-w-[38px] !p-0"
                                icon={action.icon}
                                borderColor={action.borderColor}
                                backgroundColor={action.backgroundColor}
                                textColor={action.textColor}
                                radius="8px"
                              />
                            ) : (
                              <Button
                                key={action.type}
                                variant={action.variant || 'primary'}
                                size="sm"
                                className="!h-[38px] !py-[9px] !px-4"
                                icon={action.icon}
                                iconPosition="left"
                                backgroundColor={action.backgroundColor}
                                borderColor={action.borderColor}
                                textColor={action.textColor}
                                radius="6px"
                              >
                                {action.label}
                              </Button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                },
              },
            ] as any}
            dataSource={[
              {
                key: '1',
                orderId: '9023018',
                awbNo: '892342014124012',
                productName: 'Blue T-shirt',
                extraItems: 2,
                price: '₹ 2,200',
                paymentMode: 'Prepaid',
                ndrType: 'Consignee Unavailable',
                attemptCount: 2,
                lastUpdated: '8 Jan | 12:40 PM',
                proofs: [
                  { label: 'Whatsapp', type: 'whatsapp' },
                  { label: 'Call Recording', type: 'call' },
                  { label: 'Geofence', type: 'geofence' },
                ],
                actions: [
                  {
                    type: 'reattempt',
                    label: 'Reattempt',
                    icon: <NdrReattemptIcon />,
                    variant: 'primary',
                    backgroundColor: '#1F222E',
                  },
                  {
                    type: 'return',
                    label: 'Return',
                    icon: <NdrReturnIcon />,
                    variant: 'outline',
                    borderColor: '#E0E3EB',
                    textColor: '#3D445C',
                  },
                  {
                    type: 'more',
                    icon: <NdrMoreIcon />,
                    variant: 'outline',
                    borderColor: '#E0E3EB',
                    iconOnly: true,
                  },
                ],
              },
              {
                key: '2',
                orderId: '9023019',
                awbNo: '892342014124013',
                productName: 'Red Hoodie',
                extraItems: 1,
                price: '₹ 3,500',
                paymentMode: 'COD',
                ndrType: 'Address Issue',
                attemptCount: 1,
                lastUpdated: '9 Jan | 10:15 AM',
                proofs: [
                  { label: 'Whatsapp', type: 'whatsapp' },
                  { label: 'Geofence', type: 'geofence' },
                ],
                actions: [
                  {
                    type: 'reattempt',
                    label: 'Reattempt',
                    icon: <NdrReattemptIcon />,
                    variant: 'primary',
                    backgroundColor: '#1F222E',
                  },
                  {
                    type: 'more',
                    icon: <NdrMoreIcon />,
                    variant: 'outline',
                    borderColor: '#E0E3EB',
                    iconOnly: true,
                  },
                ],
              },
              {
                key: '3',
                orderId: '9023020',
                awbNo: '892342014124014',
                productName: 'Black Jeans',
                extraItems: 0,
                price: '₹ 1,800',
                paymentMode: 'Prepaid',
                ndrType: 'Customer Refused',
                attemptCount: 3,
                lastUpdated: '10 Jan | 3:25 PM',
                proofs: [{ label: 'Call Recording', type: 'call' }],
              },
            ]}
            size="medium"
            pagination={false}
            rowSelection={{ type: 'checkbox' } as any}
          />
        </div>
      </section>

      {/* Actually floating buttons fixed to the page corners */}
      <FloatingButton
        icon={<PlusIcon />}
        position='bottom-right'
        backgroundColor='#f59e0b'
        shadow='shadow-xl'
        isLoading={isLoading}
      />

      <FloatingButton
        icon={<EditIcon />}
        position='bottom-left'
        variant='secondary'
        size='sm'
        isDisabled={isLoading}
      />

      <FloatingButton
        icon={<ShareIcon />}
        position='top-right'
        variant='outline'
        size='lg'
      />

      
    </div>
  )
}

const initApp = async () => {
  const themeData = await loadTheme()
  const rootElement = document.getElementById('root')

  if (rootElement) {
    const root = createRoot(rootElement)
    const app = (
      <ThemeProvider initialTheme={themeData.light}>
        <App />
      </ThemeProvider>
    ) as React.ReactElement
    root.render(app)
  }
}

initApp()
