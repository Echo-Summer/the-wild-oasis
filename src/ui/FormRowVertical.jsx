import React from 'react'
import styled from 'styled-components'

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  gap: 0.8rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  /* 特殊情况：如果里面有button，就让它横向靠右对齐 */
  /* &:has(button) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 1.2rem;
    border-bottom: none; /* 按钮行通常不需要底边框 */
  /* } */
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

export default function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && children?.props?.id && (
        <Label htmlFor={children.props.id}>{label}</Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}
