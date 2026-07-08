"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const mentionsVariants = cva("relative", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

interface MentionUser {
  id: string;
  name: string;
  avatar?: string;
}

interface MentionsProps
  extends React.ComponentProps<"div">, VariantProps<typeof mentionsVariants> {
  /** Function to search for users based on query */
  onSearch?: (query: string) => Promise<MentionUser[]> | MentionUser[];
  /** Called when a mention is inserted */
  onMention?: (user: MentionUser) => void;
  /** Called when value changes */
  onValueChange?: (value: string | null) => void;
  /** Placeholder text */
  placeholder?: string;
}

function Mentions({
  className,
  size,
  onSearch,
  onMention,
  onValueChange,
  placeholder = "Type @ to mention...",
  ...props
}: MentionsProps) {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [suggestions, setSuggestions] = React.useState<MentionUser[]>([]);
  const [mentionStart, setMentionStart] = React.useState(-1);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValue(v);
    onValueChange?.(v);

    const cursorPos = e.target.selectionStart ?? 0;
    const textBeforeCursor = v.slice(0, cursorPos);
    const atIndex = textBeforeCursor.lastIndexOf("@");

    if (atIndex >= 0) {
      const query = textBeforeCursor.slice(atIndex + 1);
      if (!query.includes(" ") && query.length >= 0) {
        setMentionStart(atIndex);
        searchUsers(query);
        return;
      }
    }

    setIsOpen(false);
    setMentionStart(-1);
  };

  const searchUsers = async (query: string) => {
    if (!onSearch) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    const results = await onSearch(query);
    setSuggestions(results);
    setIsOpen(results.length > 0);
    setActiveIndex(0);
  };

  const insertMention = (user: MentionUser) => {
    if (mentionStart < 0) return;
    const cursorPos = textareaRef.current?.selectionStart ?? value.length;
    const before = value.slice(0, mentionStart);
    const after = value.slice(cursorPos);
    const newValue = `${before}@${user.name} ${after}`;
    setValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
    setMentionStart(-1);
    onMention?.(user);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[activeIndex]) insertMention(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      data-slot="mentions"
      className={cn(mentionsVariants({ size }), className)}
      {...props}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={3}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          size === "sm" && "text-xs",
          size === "lg" && "text-base",
        )}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="bg-popover absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border p-1 shadow-md">
          {suggestions.map((user, i) => (
            <li
              key={user.id}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
                i === activeIndex && "bg-accent text-accent-foreground",
              )}
              onMouseDown={() => insertMention(user)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {user.avatar && (
                <img src={user.avatar} alt="" className="size-5 rounded-full" />
              )}
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Mentions, mentionsVariants };
