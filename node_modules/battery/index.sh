#!/usr/bin/env bash

state () {
  cat /proc/acpi/battery/BAT0/state
}

info () {
  cat /proc/acpi/battery/BAT0/info
}

life () {
  l=`state | grep 'remaining capacity'`
  c=`state | grep 'charging state'`
  c=${c#charging state:}
  c=${c%%discharging}
  echo ${l#remaining capacity:} $c
}

help () {
  cat ./README.markdown
}

status () {
  state
}

case "$1" in
  state|info|life|help|status) $1 ;;
  *) life ;;
esac


