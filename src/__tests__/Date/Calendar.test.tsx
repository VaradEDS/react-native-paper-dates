import { render } from '@testing-library/react-native'
import Calendar from '../../Date/Calendar'

it('renders Calendar', async () => {
  const fixedDate = new Date('2025-01-15')
  const { toJSON } = await render(
    <Calendar
      locale="en"
      mode="single"
      date={fixedDate}
      onChange={() => null}
    />
  )
  expect(toJSON()).toMatchSnapshot()
})

it('draws the month on the first render when initialLayout is given', async () => {
  const fixedDate = new Date('2025-01-15')
  const { queryByText, rerender } = await render(
    <Calendar
      locale="en"
      mode="single"
      date={fixedDate}
      onChange={() => null}
    />
  )
  // Without a size it waits for its own layout.
  expect(queryByText('January 2025')).toBeNull()

  await rerender(
    <Calendar
      locale="en"
      mode="single"
      date={fixedDate}
      onChange={() => null}
      initialLayout={{ width: 320, height: 400 }}
    />
  )
  expect(queryByText('January 2025')).toBeTruthy()
})
