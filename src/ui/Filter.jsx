import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`

function Filter({ filterField, options }) {
  // searchParams 是 URL 查询参数对象
  // setSearchParams 用来更新查询参数
  const [searchParams, setSearchParams] = useSearchParams()
  const currentFilter = searchParams.get(filterField) || options.at(0).value

  function handleClick(value) {
    // 设置参数（会更新 URL，比如 /cabins?discount=all）
    searchParams.set(filterField, value)
    searchParams.set('page', 1) // 每次切换筛选时都回到第一页,这样在切换筛选或者排序时，就不会保留之前的页码，避免 Supabase 报 416 错误。
    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}

      {/* <FilterButton
        active={discount === 'all'}
        onClick={() => handleClick('all')}
      >
        All
      </FilterButton> */}
      {/* <FilterButton
        active={discount === 'no-discount'}
        onClick={() => handleClick('no-discount')}
      >
        No discount
      </FilterButton>
      <FilterButton
        active={discount === 'with-discount'}
        onClick={() => handleClick('with-discount')}
      >
        With discount
      </FilterButton> */}
    </StyledFilter>
  )
}

export default Filter
