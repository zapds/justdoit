import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
import Content from "./dropdown-menu-content.svelte";
import Group from "./dropdown-menu-group.svelte";
import Item from "./dropdown-menu-item.svelte";
import Label from "./dropdown-menu-label.svelte";
import Separator from "./dropdown-menu-separator.svelte";
import Trigger from "./dropdown-menu-trigger.svelte";
import GroupHeading from "./dropdown-menu-group-heading.svelte";
const Sub = DropdownMenuPrimitive.Sub;
const Root = DropdownMenuPrimitive.Root;

export {
	Content,
	Root as DropdownMenu,
	Content as DropdownMenuContent,
	Group as DropdownMenuGroup,
	Item as DropdownMenuItem,
	Label as DropdownMenuLabel,
	Separator as DropdownMenuSeparator,
	Trigger as DropdownMenuTrigger,
	Group,
	GroupHeading,
	Item,
	Label,
	Root,
	Separator,
	Trigger,
};