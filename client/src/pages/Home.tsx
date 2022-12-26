import { Container, Grid } from '@mantine/core';
import { ArticleCardFooter } from "../components/ArticleCard";

export default function Home() {
    return (
    <Container>
        <Grid >
        <Grid.Col span={4}>
          <ArticleCardFooter image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                            category={'Education'} 
                            title={'National University of Singapore is the best university'} 
                            footer={'1,233 people liked this'} 
                            author={{
                              name: 'Puri Virakarin',
                              description: 'posted 2 days ago',
                              image: ''
          }} />
        </Grid.Col>
        <Grid.Col span={4}>
          <ArticleCardFooter image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                            category={'Education'} 
                            title={'National University of Singapore is the best university'} 
                            footer={'1,233 people liked this'} 
                            author={{
                              name: 'Puri Virakarin',
                              description: 'posted 2 days ago',
                              image: ''
          }} />
        </Grid.Col> 
        <Grid.Col span={4}>
          <ArticleCardFooter image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                            category={'Education'} 
                            title={'National University of Singapore is the best university'} 
                            footer={'1,233 people liked this'} 
                            author={{
                              name: 'Puri Virakarin',
                              description: 'posted 2 days ago',
                              image: ''
          }} />
        </Grid.Col>
        <Grid.Col span={4}>
        <ArticleCardFooter image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                            category={'Education'} 
                            title={'National University of Singapore is the best university'} 
                            footer={'1,233 people liked this'} 
                            author={{
                              name: 'Puri Virakarin',
                              description: 'posted 2 days ago',
                              image: ''
          }} />
        </Grid.Col>
        <Grid.Col span={4}>
        <ArticleCardFooter image={'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80'} 
                            category={'Education'} 
                            title={'National University of Singapore is the best university'} 
                            footer={'1,233 people liked this'} 
                            author={{
                              name: 'Puri Virakarin',
                              description: 'posted 2 days ago',
                              image: ''
          }} />
        </Grid.Col>
        </Grid>
      
      </Container>
    );
}