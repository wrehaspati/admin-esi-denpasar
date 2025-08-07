"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Info } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import React from "react"
import { IGame } from "@/types/game"
import axiosInstance from "@/lib/axios"
import LoadingScreen from "@/components/loading-screen"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { FormFieldWrapper } from "@/components/form-field-wrapper"
import { ICategory } from "@/types/category"
import useSWR from "swr"
import { useUser } from "@/hooks/use-user"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { IAthlete } from "@/types/athlete"

const FormSchema = z.object({
  game_id: z.string().min(1, {
    message: "Please select a game."
  }),
  category_id: z.number().min(1, {
    message: "Please select a category."
  }),
  tournament_name: z.string().min(1, {
    message: "Please enter a tournament name."
  }),
  team_name: z.string().min(1, {
    message: "Please enter a team name."
  }),
  rank: z.string().min(1, {
    message: "Please select a rank."
  }),
  teams: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Please enter a player name."
      }),
      nickname: z.string().min(1, {
        message: "Please enter a player nickname."
      }),
      phone: z.string().min(1, {
        message: "Please enter a player phone number."
      }),
      id_game: z.string().min(1, {
        message: "Please enter a player in-game ID."
      }),
      athlete_id: z.number().min(1, {
        message: "Please select an athlete."
      }),
    })
  )
})

export function ChampionForm() {
  const [games, setGames] = React.useState<IGame[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const { activeEvent } = useUser()
  const router = useRouter()
  const searchParams = useSearchParams()
  const success = searchParams.get("success")
  const error = searchParams.get("error")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      game_id: "",
      category_id: parseInt(activeEvent?.category?.id ?? ""),
      tournament_name: "",
      team_name: "",
      rank: "",
      teams: [
        { name: "", nickname: "", phone: "", id_game: "" },
      ],
    },
  })

  const fetcher = (url: string) => axiosInstance.get(url).then((r) => r.data)
  const { data: category } = useSWR("/categories", fetcher)
  const { data: athletes } = useSWR("/athletes", fetcher)

  const categoryOptions = category?.data?.map((category: ICategory) => ({
    value: category?.id,
    label: category?.name,
  }));

  const athleteOptions = athletes?.data?.map((athlete: IAthlete) => ({
    value: athlete?.id,
    label: athlete?.full_name,
  }));

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teams",
  });

  React.useEffect(() => {
    if (games.length === 0) {
      axiosInstance.get('/eo/games')
        .then((r) => setGames(r.data.data))
        .catch(function (error) {
          toast({
            title: "Action Failed",
            description: "Error: " + error + ". " + error?.response?.data?.message,
          })
        })
    }
  }, [games])

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    axiosInstance.post('/eo/leaderboard', formData)
      .then(function (response) {
        router.push("/organizer/form/champion?success=1")
        form.reset()
        toast({ title: response.data?.message })
      })
      .catch(function (error) {
        router.push("/organizer/form/champion?success=1")
        toast({
          title: "Failed to submit",
          description: "Error: " + error + ". " + error?.response?.data?.message,
        })
      }).finally(() => setIsLoading(false));
  }

  if (!games) {
    return <LoadingScreen />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:w-2/3 space-y-6">

        {success === "1" && (
          <Alert variant="default">
            <Info className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Champion Request form was submitted successfully.</AlertDescription>
          </Alert>
        )}

        {error === "1" && (
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>There was an error submitting your form.</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="game_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Games</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value && games
                        ? games.find(
                          (game) => game.id.toString() === field.value.toString()
                        )?.name
                        : "Select game name"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search type..." />
                    <CommandList>
                      <CommandEmpty>No games found.</CommandEmpty>
                      <CommandGroup>
                        {games.map((game) => (
                          <CommandItem
                            value={game.id.toString()}
                            key={game.id.toString()}
                            onSelect={() => {
                              form.setValue("game_id", game.id.toString())
                            }}
                          >
                            {game.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                game.id == field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the game name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tournament_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl>
                <Input placeholder="tournament name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the tournament.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFieldWrapper control={form.control} name="category_id" label="Category" description="Automatically selects the current event category." options={categoryOptions ?? []} type="combobox" disabled={true} />
        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="team name" {...field} />
              </FormControl>
              <FormDescription>
                Name of the winner team.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Ranking</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select winner team rank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"1"}>Rank #1</SelectItem>
                  <SelectItem value={"2"}>Rank #2</SelectItem>
                  <SelectItem value={"3"}>Rank #3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between">
                    <span>
                      {`Player ${index + 1}`}
                    </span>
                    {fields.length > 1 && (
                      <Button type="button" variant="destructive" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name={`teams.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Player's Name"}</FormLabel>
                      <FormControl>
                        <Input placeholder={`player's ${index + 1} name`} {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`teams.${index}.nickname`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Player's Game Nickname"}</FormLabel>
                      <FormControl>
                        <Input placeholder={`player's ${index + 1} game nickname`} {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`teams.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Player's Phone Number"}</FormLabel>
                      <FormControl>
                        <Input placeholder={`player's ${index + 1} phone number`} {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`teams.${index}.id_game`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Player's In-Game ID"}</FormLabel>
                      <FormControl>
                        <Input placeholder={`player's ${index + 1} in-game id`} {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormFieldWrapper control={form.control} name={`teams.${index}.athlete_id`} label="Athlete" description="Silahkan pilih akun ESI Player" options={athleteOptions ?? []} type="combobox" />
              </CardContent>
            </Card>
          ))}
          {fields.length < 6 && (
            <Button type="button" onClick={() => append({ id_game: "", name: "", nickname: "", phone: "", athlete_id: 0 })}>
              Add Player
            </Button>
          )}
        </div>
        <Button type="submit">Submit {isLoading && <LoadingSpinner />}</Button>
      </form>
    </Form>
  )
}
