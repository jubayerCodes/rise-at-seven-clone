"use client";

import { FooterLogo } from "@/assets/svg/home.svg";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useOffCanvasHeaderStore } from "@/store/off-canvas-header-store";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";

function OffCanvas() {
  const { open, setOpen, setHeaderMenu, headerMenu } = useOffCanvasHeaderStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"h-screen max-w-[100vw] bg-transparent p-2"} showCloseButton={false}>
        <div className="bg-foreground/80 rounded-3xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <FooterLogo className="w-32 text-white pt-1" />

              <X
                onClick={() => {
                  setOpen(false);
                  setHeaderMenu([]);
                }}
                className="text-white size-8 p-1 -mt-1"
              />
            </div>
            <div className="mt-10">
              {headerMenu.map((menu, idx) => (
                <div key={idx}>
                  {menu?.children && menu?.children.items.length > 0 ? (
                    <Collapsible className="group/collapsible">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`${menu.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex-1 text-4xl font-medium tracking-tight transition flex items-center text-white"
                        >
                          {menu.title}
                        </Link>
                        <CollapsibleTrigger
                          className={
                            "size-6 rounded-full hover:bg-accent border flex items-center justify-center aria-expanded:rotate-180 transition-transform duration-200"
                          }
                        >
                          <ChevronDown className="size-4 text-white" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <div className="flex flex-col gap-0.5 py-4">
                          {menu.children?.items.map((sub, i) => (
                            <Link
                              key={i}
                              href={`${sub.slug}`}
                              className="flex-1 text-[22px] font-medium tracking-tight transition flex items-center text-white"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={`menu.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-white text-4xl font-medium tracking-tight transition flex items-center"
                    >
                      {menu.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button className={"w-full"}>
            Get In Touch <ArrowUpRight />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OffCanvas;
