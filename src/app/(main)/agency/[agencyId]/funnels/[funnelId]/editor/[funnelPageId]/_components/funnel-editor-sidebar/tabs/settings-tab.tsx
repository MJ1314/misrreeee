'use client'
import React, { useState, useEffect, useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlignCenter,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from 'lucide-react'
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEditor } from '@/providers/editor/editor-provider'
import { Slider } from '@/components/ui/slider'
import { SketchPicker } from 'react-color'

type Props = {}

const SettingsTab = (props: Props) => {
  const { state, dispatch } = useEditor()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [displayTextColorPicker, setDisplayTextColorPicker] = useState(false)
  const [displayPrimaryColorPicker, setDisplayPrimaryColorPicker] = useState(false)
  const [displaySecondaryColorPicker, setDisplaySecondaryColorPicker] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    state.editor.selectedElement.styles.backgroundColor || '#fff'
  )
  const [textColor, setTextColor] = useState(
    state.editor.selectedElement.styles.color || '#000'
  )
  const [primaryColor, setPrimaryColor] = useState('#ff7e5f')
  const [secondaryColor, setSecondaryColor] = useState('#feb47b')
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const textColorPickerRef = useRef<HTMLDivElement>(null)
  const primaryColorPickerRef = useRef<HTMLDivElement>(null)
  const secondaryColorPickerRef = useRef<HTMLDivElement>(null)
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const textInputContainerRef = useRef<HTMLDivElement>(null)
  const primaryColorInputContainerRef = useRef<HTMLDivElement>(null)
  const secondaryColorInputContainerRef = useRef<HTMLDivElement>(null)

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id
    let value = e.target.value
    const styleObject = {
      [styleSettings]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    })
  }

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id
    let value = e.target.value
    const styleObject = {
      [settingProperty]: value,
    }

    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          content: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    })
  }

  const handleBackgroundColorChange = (color: any) => {
    setBackgroundColor(color.hex)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            backgroundColor: color.hex,
          },
        },
      },
    })
  }

  const handleTextColorChange = (color: any) => {
    setTextColor(color.hex)
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            color: color.hex,
          },
        },
      },
    })
  }

  const handlePrimaryColorChange = (color: any) => {
    setPrimaryColor(color.hex)
    const gradient = `linear-gradient(to right, ${color.hex}, ${secondaryColor})`
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            backgroundImage: gradient,
          },
        },
      },
    })
  }

  const handleSecondaryColorChange = (color: any) => {
    setSecondaryColor(color.hex)
    const gradient = `linear-gradient(to right, ${primaryColor}, ${color.hex})`
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            backgroundImage: gradient,
          },
        },
      },
    })
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node) &&
      !inputContainerRef.current?.contains(event.target as Node)
    ) {
      setDisplayColorPicker(false)
    }
    if (
      textColorPickerRef.current &&
      !textColorPickerRef.current.contains(event.target as Node) &&
      !textInputContainerRef.current?.contains(event.target as Node)
    ) {
      setDisplayTextColorPicker(false)
    }
    if (
      primaryColorPickerRef.current &&
      !primaryColorPickerRef.current.contains(event.target as Node) &&
      !primaryColorInputContainerRef.current?.contains(event.target as Node)
    ) {
      setDisplayPrimaryColorPicker(false)
    }
    if (
      secondaryColorPickerRef.current &&
      !secondaryColorPickerRef.current.contains(event.target as Node) &&
      !secondaryColorInputContainerRef.current?.contains(event.target as Node)
    ) {
      setDisplaySecondaryColorPicker(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (state.editor.selectedElement) {
      setBackgroundColor(state.editor.selectedElement.styles.backgroundColor || '#fff')
      setTextColor(state.editor.selectedElement.styles.color || '#000')
    }
  }, [state.editor.selectedElement])

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={['Typography', 'Dimensions', 'Decorations', 'Flexbox']}
    >
      <AccordionItem value="Custom" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === 'link' &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https://domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={state.editor.selectedElement.content.href || ''}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Text Align</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'textAlign',
                    value: e,
                  },
                })
              }
              value={state.editor.selectedElement.styles.textAlign || ''}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="left"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Input
              id="fontFamily"
              onChange={handleOnChanges}
              value={state.editor.selectedElement.styles.fontFamily || ''}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <div className="flex border-[1px] rounded-md overflow-clip relative" ref={textInputContainerRef}>
              <div
                className="w-12 cursor-pointer"
                style={{
                  backgroundColor: textColor,
                }}
                onClick={() => setDisplayTextColorPicker(!displayTextColorPicker)}
              />
              <Input
                placeholder="#000000"
                className={`!border-y-0 rounded-none !border-r-0 mr-2 ${displayTextColorPicker ? 'h-48' : ''}`}
                id="color"
                onChange={(e) => {
                  setTextColor(e.target.value)
                  handleOnChanges(e)
                }}
                value={textColor}
              />
              {displayTextColorPicker && (
                <div className="absolute z-50" ref={textColorPickerRef}>
                  <SketchPicker
                    color={textColor}
                    onChangeComplete={handleTextColorChange}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: 'fontWeight',
                      value: e,
                    },
                  })
                }
                value={state.editor.selectedElement.styles.fontWeight || ''}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <div className="flex items-center">
                <Input
                  placeholder=""
                  id="fontSize"
                  onChange={(e) => {
                    handleOnChanges({
                      target: {
                        id: 'fontSize',
                        value: `${e.target.value}px`,
                      },
                    })
                  }}
                  value={
                    parseInt(state.editor.selectedElement.styles.fontSize as string) || ''
                  }
                  className="w-16"
                />
                <span className="text-muted-foreground">px</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Dimensions</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <div className="flex items-center">
                      <Input
                        id="height"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'height',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.height as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <div className="flex items-center">
                      <Input
                        id="width"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'width',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.width as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>
              </div>
              <p>Margin</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <div className="flex items-center">
                      <Input
                        id="marginTop"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'marginTop',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.marginTop as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <div className="flex items-center">
                      <Input
                        id="marginBottom"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'marginBottom',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.marginBottom as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <div className="flex items-center">
                      <Input
                        id="marginLeft"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'marginLeft',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.marginLeft as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <div className="flex items-center">
                      <Input
                        id="marginRight"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'marginRight',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.marginRight as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <div className="flex items-center">
                      <Input
                        id="paddingTop"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'paddingTop',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.paddingTop as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <div className="flex items-center">
                      <Input
                        id="paddingBottom"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'paddingBottom',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.paddingBottom as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <div className="flex items-center">
                      <Input
                        id="paddingLeft"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'paddingLeft',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.paddingLeft as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <div className="flex items-center">
                      <Input
                        id="paddingRight"
                        onChange={(e) => {
                          handleOnChanges({
                            target: {
                              id: 'paddingRight',
                              value: `${e.target.value}px`,
                            },
                          })
                        }}
                        value={
                          parseInt(state.editor.selectedElement.styles.paddingRight as string) ||
                          ''
                        }
                        className="w-16"
                      />
                      <span className="text-muted-foreground">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Decorations</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof state.editor.selectedElement.styles?.opacity === 'number'
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || '0'
                      ).replace('%', '')
                    ) || 0}
                %
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: 'opacity',
                    value: `${e[0]}%`,
                  },
                })
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.opacity === 'number'
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || '0'
                      ).replace('%', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small className="">
                {typeof state.editor.selectedElement.styles?.borderRadius === 'number'
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || '0'
                      ).replace('px', '')
                    ) || 0}
                px
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: 'borderRadius',
                    value: `${e[0]}px`,
                  },
                })
              }}
              defaultValue={[
                typeof state.editor.selectedElement.styles?.borderRadius === 'number'
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || '0'
                      ).replace('%', '')
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex border-[1px] rounded-md overflow-clip relative" ref={inputContainerRef}>
              <div
                className="w-12 cursor-pointer"
                style={{
                  backgroundColor: backgroundColor,
                }}
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
              />
              <Input
                placeholder="#HFI245"
                className={`!border-y-0 rounded-none !border-r-0 mr-2 ${displayColorPicker ? 'h-48' : ''}`}
                id="backgroundColor"
                onChange={(e) => {
                  setBackgroundColor(e.target.value)
                  handleOnChanges(e)
                }}
                value={backgroundColor}
              />
              {displayColorPicker && (
                <div className="absolute z-50" ref={colorPickerRef}>
                  <SketchPicker
                    color={backgroundColor}
                    onChangeComplete={handleBackgroundColorChange}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Gradient</Label>
            <div className="flex flex-col gap-2">
              <div className="flex border-[1px] rounded-md overflow-clip relative" ref={primaryColorInputContainerRef}>
                <div
                  className="w-12 cursor-pointer"
                  style={{
                    backgroundColor: primaryColor,
                  }}
                  onClick={() => setDisplayPrimaryColorPicker(!displayPrimaryColorPicker)}
                />
                <Input
                  placeholder="Primary Color"
                  className={`!border-y-0 rounded-none !border-r-0 mr-2 ${displayPrimaryColorPicker ? 'h-48' : ''}`}
                  id="primaryColor"
                  onChange={(e) => {
                    setPrimaryColor(e.target.value)
                    const gradient = `linear-gradient(to right, ${e.target.value}, ${secondaryColor})`
                    handleOnChanges({
                      target: {
                        id: 'backgroundImage',
                        value: gradient,
                      },
                    })
                  }}
                  value={primaryColor}
                />
                {displayPrimaryColorPicker && (
                  <div className="absolute z-50" ref={primaryColorPickerRef}>
                    <SketchPicker
                      color={primaryColor}
                      onChangeComplete={handlePrimaryColorChange}
                    />
                  </div>
                )}
              </div>
              <div className="flex border-[1px] rounded-md overflow-clip relative" ref={secondaryColorInputContainerRef}>
                <div
                  className="w-12 cursor-pointer"
                  style={{
                    backgroundColor: secondaryColor,
                  }}
                  onClick={() => setDisplaySecondaryColorPicker(!displaySecondaryColorPicker)}
                />
                <Input
                  placeholder="Secondary Color"
                  className={`!border-y-0 rounded-none !border-r-0 mr-2 ${displaySecondaryColorPicker ? 'h-48' : ''}`}
                  id="secondaryColor"
                  onChange={(e) => {
                    setSecondaryColor(e.target.value)
                    const gradient = `linear-gradient(to right, ${primaryColor}, ${e.target.value})`
                    handleOnChanges({
                      target: {
                        id: 'backgroundImage',
                        value: gradient,
                      },
                    })
                  }}
                  value={secondaryColor}
                />
                {displaySecondaryColorPicker && (
                  <div className="absolute z-50" ref={secondaryColorPickerRef}>
                    <SketchPicker
                      color={secondaryColor}
                      onChangeComplete={handleSecondaryColorChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex border-[1px] rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundImage:
                    state.editor.selectedElement.styles.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={state.editor.selectedElement.styles.backgroundImage || ''}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: 'backgroundSize',
                    value: e,
                  },
                })
              }
              value={
                state.editor.selectedElement.styles.backgroundSize?.toString() || ''
              }
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="cover"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="contain"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyCenter size={22} />
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <LucideImageDown size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          <Label className="text-muted-foreground">Justify Content</Label>
          <Tabs
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: 'justifyContent',
                  value: e,
                },
              })
            }
            value={state.editor.selectedElement.styles.justifyContent || ''}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger
                value="space-between"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalSpaceBetween size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="space-evenly"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalSpaceAround size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="start"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyStart size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="end"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyEndIcon size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Label className="text-muted-foreground">Align Items</Label>
          <Tabs
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: 'alignItems',
                  value: e,
                },
              })
            }
            value={state.editor.selectedElement.styles.alignItems || ''}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="normal"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input
              className="h-4 w-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(va) => {
                handleOnChanges({
                  target: {
                    id: 'display',
                    value: va.target.checked ? 'flex' : 'block',
                  },
                })
              }}
              checked={state.editor.selectedElement.styles.display === 'flex'}
            />
            <Label className="text-muted-foreground">Flex</Label>
          </div>
          <div>
            <Label className="text-muted-foreground">Direction</Label>
            <div className="flex items-center">
              <Input
                id="flexDirection"
                onChange={(e) => {
                  handleOnChanges({
                    target: {
                      id: 'flexDirection',
                      value: `${e.target.value}px`,
                    },
                  })
                }}
                value={
                  parseInt(state.editor.selectedElement.styles.flexDirection as string) ||
                  ''
                }
                className="w-16"
              />
              <span className="text-muted-foreground">px</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default SettingsTab
