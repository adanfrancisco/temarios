import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL=import.meta.env.VITE_URL_SCRIPTS;


export const useFetchAsistencias = () => {
  return useQuery({
    queryKey: ['asistencias'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    }
  });
};
export const useFetchAlumnos = () => {
  return useQuery({
    queryKey: ['alumnos'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}?action=getAlumnos`);
      // console.log(data)
      return data;
    }
  });
};

export const useAddAsistencia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nuevaAsistencia) => {
      await axios.post(API_URL, nuevaAsistencia);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['asistencias']);
    }
  });
};

export const useUpdateAsistencia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updatedAsistencia }) => {
      await axios.put(`${API_URL}/${id}`, updatedAsistencia);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['asistencias']);
    }
  });
};