import {Controller, Inject} from '@nestjs/common';
import {ClientProxy, EventPattern} from '@nestjs/microservices';
import {ConfigurationEnum} from './common/configuration.enum';
import {ImageRabbit} from './images/image.rabbit';
import {ImageRabbitEvent} from './images/image.rabbit.event';
import {processEnum} from './process/process.enum';
import {ProcessService} from './process/process.service';
import * as process from 'process';

@Controller()
export class AppController
{
    constructor(
        private readonly processService: ProcessService,
        @Inject('IMPRESSION_GCODE') private readonly clientImpressionGCode: ClientProxy
    )
    {
    }

    @EventPattern('generation-lite')
    async handleGenerationJpegLite(data: Record<string, ImageRabbit>)
    {
        // récupération de l'objet en base
        const image = data.message;
        // execution de la commande
        await this.processService.execCommand(processEnum.JPG2LITE, "http://" + process.env.RABBIT_HOST + ":3000/api/images", image.id, ConfigurationEnum.IMPRESSION_REPERTOIRE, image.imageSelectionnee, '"' + image.pseudo + '"')
            .catch(error =>
            {
                console.log('caught', error.message);
            });
        // Envoi d'un message pour indiquer la fin de la génération du svg
        this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
    }

    @EventPattern('generation-tsp')
    async handleGenerationTsp(data: Record<string, ImageRabbit>)
    {
        // récupération de l'objet en base
        const image = data.message;
        // execution de la commande
        await this.processService.execCommand(processEnum.JPG2TSP, "http://" + process.env.RABBIT_HOST + ":3000/api/images", image.id, ConfigurationEnum.IMPRESSION_REPERTOIRE, image.imageSelectionnee, '"' + image.pseudo + '"')
            .catch(error =>
            {
                console.log('caught', error.message);
            });
        // Envoi d'un message pour indiquer la fin de la génération du svg
        this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
    }

    @EventPattern('generation-squiggle')
    async handleGenerationSquiggle(data: Record<string, ImageRabbit>)
    {
        // récupération de l'objet en base
        const image = data.message;
        // execution de la commande
        await this.processService.execCommand(processEnum.JPG2SQUIGGLE, "http://" + process.env.RABBIT_HOST + ":3000/api/images", image.id, ConfigurationEnum.IMPRESSION_REPERTOIRE, image.imageSelectionnee, '"' + image.pseudo + '"')
            .catch(error =>
            {
                console.log('caught', error.message);
            });
        // Envoi d'un message pour indiquer la fin de la génération du svg
        this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
    }

    @EventPattern('generation-mst')
    async handleGenerationMst(data: Record<string, ImageRabbit>)
    {
        // récupération de l'objet en base
        const image = data.message;
        // execution de la commande
        await this.processService.execCommand(processEnum.JPG2MST, "http://" + process.env.RABBIT_HOST + ":3000/api/images", image.id, ConfigurationEnum.IMPRESSION_REPERTOIRE, image.imageSelectionnee, '"' + image.pseudo + '"')
            .catch(error =>
            {
                console.log('caught', error.message);
            });
        // Envoi d'un message pour indiquer la fin de la génération du svg
        this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
    }

    @EventPattern('generation-skip')
    async handleGenerationSkip(data: Record<string, ImageRabbit>)
    {
        // récupération de l'objet en base
        const image = data.message;
        // execution de la commande
        await this.processService.execCommand(processEnum.JPG2SKIP, "http://" + process.env.RABBIT_HOST + ":3000/api/images", image.id, ConfigurationEnum.IMPRESSION_REPERTOIRE, image.imageSelectionnee, '"' + image.pseudo + '"')
            .catch(error =>
            {
                console.log('caught', error.message);
            });
        // Envoi d'un message pour indiquer la fin de la génération du svg
        this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
    }

    @EventPattern('generation-mst')
    async handleGenerationHilbert(data: Record<string, ImageRabbit>)
    {
        // récupération de l'objet en base
        const image = data.message;
        // execution de la commande
        await this.processService.execCommand(processEnum.JPG2HILBERT, "http://" + process.env.RABBIT_HOST + ":3000/api/images", image.id, ConfigurationEnum.IMPRESSION_REPERTOIRE, image.imageSelectionnee, '"' + image.pseudo + '"')
            .catch(error =>
            {
                console.log('caught', error.message);
            });
        // Envoi d'un message pour indiquer la fin de la génération du svg
        this.clientImpressionGCode.emit<any>('impression-gcode', new ImageRabbitEvent(image));
    }
}
