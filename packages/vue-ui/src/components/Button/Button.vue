<script setup lang="ts">
import type { ButtonProps } from './button';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  shape: 'default',
  loading: false,
  disabled: false,
  fullWidth: false,
});

const sizeClasses: Record<string, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3 text-lg',
};

const variantColorClasses: Record<string, Record<string, string>> = {
  filled: {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    success: 'bg-green-600 text-white hover:bg-green-700',
  },
  outlined: {
    primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    secondary: 'border border-gray-600 text-gray-600 hover:bg-gray-50',
    danger: 'border border-red-600 text-red-600 hover:bg-red-50',
    warning: 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50',
    success: 'border border-green-600 text-green-600 hover:bg-green-50',
  },
  ghost: {
    primary: 'text-blue-600 hover:bg-blue-50',
    secondary: 'text-gray-600 hover:bg-gray-50',
    danger: 'text-red-600 hover:bg-red-50',
    warning: 'text-yellow-500 hover:bg-yellow-50',
    success: 'text-green-600 hover:bg-green-50',
  },
};

const shapeClasses: Record<string, string> = {
  default: 'rounded',
  rounded: 'rounded-lg',
  pill: 'rounded-full',
  sharp: 'rounded-none',
};

function getClasses(): string {
  const size = sizeClasses[props.size ?? 'md'] ?? sizeClasses.md;
  const shape = shapeClasses[props.shape ?? 'default'] ?? shapeClasses.default;
  const variantColors = variantColorClasses[props.variant ?? 'filled'] ?? variantColorClasses.filled;
  const colorClass = variantColors[props.color ?? 'primary'] ?? variantColors.primary ?? '';
  const width = props.fullWidth ? 'w-full' : '';
  const disabled = props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  return ['inline-flex items-center justify-center font-medium transition-colors', size, shape, colorClass, width, disabled]
    .filter(Boolean)
    .join(' ');
}
</script>

<template>
  <button
    :class="getClasses()"
    :disabled="disabled || loading"
    type="button"
  >
    <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
    <slot>{{ text }}</slot>
  </button>
</template>
