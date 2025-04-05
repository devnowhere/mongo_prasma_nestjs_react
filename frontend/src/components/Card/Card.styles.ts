import styled from 'styled-components'

export const StyledCard = styled.div
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;


export const CardHeader = styled.div
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;


export const CardBody = styled.div
  padding: 1rem;


export const CardFooter = styled.div
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

"@

 = @"
export * from './Card'
