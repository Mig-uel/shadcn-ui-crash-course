import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Sprout } from 'lucide-react'

interface Recipe {
  title: string
  image: string
  time: number
  description: string
  vegan: boolean
  id: string
}

async function getRecipes(): Promise<Recipe[]> {
  return await (await fetch('http://localhost:5000/recipes')).json()
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <main>
      <div className='grid grid-cols-3 gap-8'>
        {recipes.map((recipe) => (
          <Card key={recipe.id} className='flex flex-col justify-between'>
            <CardHeader className='flex flex-row gap-4 items-center'>
              {/* TODO: avatar */}
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between gap-3'>
              <Button>View Recipe</Button>
              {recipe.vegan && (
                <Badge className='rounded' variant='secondary'>
                  <Sprout />
                </Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
