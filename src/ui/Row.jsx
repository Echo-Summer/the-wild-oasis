import styled, { css } from 'styled-components'

const Row = styled.div`
  display: flex;

  // 直接在解构时设置默认值, 默认是垂直分布
  ${({ type = 'vertical' }) =>
    type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${({ type = 'vertical' }) =>
    type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`
// Row.defaultProps = {
//   type: 'vertical',
// }

export default Row
