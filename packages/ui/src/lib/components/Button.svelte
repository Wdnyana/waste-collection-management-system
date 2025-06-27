<script lang="ts">
  import { tv, type VariantProps } from 'tailwind-variants'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

  const buttonVariants = tv({
    base: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        primary: 'bg-green-700 text-white hover:bg-green-700/90',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-200/80',
        outline: 'border border-green-500 bg-transparent text-green-700 hover:bg-green-50',
        ghost: 'hover:bg-green-50 hover:text-green-700',
        link: 'text-green-700 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  })

  type Variant = VariantProps<typeof buttonVariants>['variant']
  type Size = VariantProps<typeof buttonVariants>['size']

  interface BaseProps {
    variant?: Variant
    size?: Size
    class?: string
    children: any
  }

  type ButtonProps = BaseProps & { href?: never } & HTMLButtonAttributes
  type AnchorProps = BaseProps & { href: string } & HTMLAnchorAttributes

  type Props = ButtonProps | AnchorProps

  const props: Props = $props()
</script>

{#if props.href}
  {@const { href, variant, size, class: className, children, ...rest } = props}
  <a {href} class={buttonVariants({ variant, size, class: className })} {...rest}>
    {@render children()}
  </a>
{:else}
  {@const { variant, size, class: className, children, ...rest } = props}
  <button
    class={buttonVariants({ variant, size, class: className })}
    {...rest as HTMLButtonAttributes}
  >
    {@render children()}
  </button>
{/if}
